import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { GenerationOptions, PersonData, DisplaySettings, ToastState } from "@/types";
import { FaIdCard } from "react-icons/fa";
import ControlPanel from "@/components/control-panel";
import DataPreview from "@/components/data-preview";
import SettingsModal from "@/components/settings-modal";
import ToastMessage from "@/components/ui/toast-message";

export default function Home() {
  const [options, setOptions] = useState<GenerationOptions>({
    country: 'russia',
    recordsCount: 10,
    fields: {
      name: true,
      phone: true,
      address: true,
      passport: true
    },
    nameOptions: {
      firstName: true,
      lastName: true,
      patronymic: true
    },
    genderRatio: 50
  });
  
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: "",
    type: "success"
  });
  
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [displaySettings, setDisplaySettings] = useState<DisplaySettings>({
    density: 'compact',
    dateFormat: 'DMY',
    fontSize: 12
  });
  
  const [lastGenerated, setLastGenerated] = useState<Date | null>(null);
  
  // Query for generated data
  const { data, isLoading, refetch } = useQuery<PersonData[]>({
    queryKey: [`/api/generate?${new URLSearchParams({
      country: options.country,
      count: options.recordsCount.toString(),
      fields: JSON.stringify(options.fields),
      nameOptions: JSON.stringify(options.nameOptions),
      genderRatio: options.genderRatio.toString()
    })}`],
    enabled: false,
  });
  
  // Function to handle generation
  const handleGenerate = async () => {
    await refetch();
    setLastGenerated(new Date());
    showToast("Data generated successfully", "success");
  };
  
  // Function to handle export
  const handleExport = async (format: 'csv' | 'txt') => {
    if (!data || data.length === 0) {
      showToast("No data to export. Generate data first.", "accent");
      return;
    }
    
    try {
      const res = await apiRequest('POST', `/api/export`, {
        format,
        data,
        options
      });
      
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `eastern-european-data.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      showToast(`${format.toUpperCase()} file downloaded with @lisurgut credit`, "accent");
    } catch (error) {
      showToast(`Failed to export data: ${error}`, "accent");
    }
  };
  
  // Function to handle copy
  const handleCopy = () => {
    if (!data || data.length === 0) {
      showToast("No data to copy. Generate data first.", "accent");
      return;
    }
    
    const text = data.map((person, index) => {
      return `#${index + 1} ${person.fullName}, ${person.phone}, ${person.address}, ${person.passport}`;
    }).join('\n');
    
    navigator.clipboard.writeText(text);
    showToast("Data copied to clipboard", "success");
  };
  
  // Helper to show toast
  const showToast = (message: string, type: 'success' | 'accent') => {
    setToast({
      visible: true,
      message,
      type
    });
    
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  // Generate initial data when component mounts
  useEffect(() => {
    handleGenerate();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <header className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center">
              <FaIdCard className="mr-2 text-accent" />
              Eastern European Data Generator
            </h1>
            <p className="text-sm text-gray-400">Generate authentic personal data for Eastern European countries</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-xs text-gray-400">Created by</span>
            <span className="text-sm font-medium text-accent">@lisurgut</span>
          </div>
        </div>
      </header>

      <main className="flex flex-col md:flex-row gap-6">
        <ControlPanel 
          options={options}
          setOptions={setOptions}
          onGenerate={handleGenerate}
          onExport={handleExport}
          onCopy={handleCopy}
          isLoading={isLoading}
        />
        
        <DataPreview 
          data={data || []}
          isLoading={isLoading}
          lastGenerated={lastGenerated}
          onRefresh={handleGenerate}
          onOpenSettings={() => setSettingsModalOpen(true)}
          settings={displaySettings}
        />
      </main>

      <SettingsModal 
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        settings={displaySettings}
        onApply={(newSettings) => {
          setDisplaySettings(newSettings);
          setSettingsModalOpen(false);
        }}
      />
      
      <ToastMessage 
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({...toast, visible: false})}
      />
    </div>
  );
}
