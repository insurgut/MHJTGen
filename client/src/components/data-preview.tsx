import { PersonData, DisplaySettings } from "@/types";
import { FaTable, FaSyncAlt, FaCog } from "react-icons/fa";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface DataPreviewProps {
  data: PersonData[];
  isLoading: boolean;
  lastGenerated: Date | null;
  onRefresh: () => void;
  onOpenSettings: () => void;
  settings: DisplaySettings;
}

export default function DataPreview({ 
  data, 
  isLoading, 
  lastGenerated, 
  onRefresh, 
  onOpenSettings,
  settings
}: DataPreviewProps) {
  const getLastGeneratedText = () => {
    if (!lastGenerated) return "Never";
    
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - lastGenerated.getTime()) / 1000);
    
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    
    return format(lastGenerated, "HH:mm:ss");
  };
  
  const getDensityClass = () => {
    switch(settings.density) {
      case 'comfortable': return 'py-1.5';
      case 'spacious': return 'py-2.5';
      default: return 'py-1'; // compact
    }
  };
  
  const getFontSizeClass = () => {
    if (settings.fontSize <= 10) return 'text-xs';
    if (settings.fontSize <= 12) return 'text-sm';
    if (settings.fontSize <= 14) return 'text-base';
    return 'text-lg';
  };
  
  return (
    <Card className="w-full md:w-2/3 bg-card rounded-lg border border-border">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold flex items-center">
            <FaTable className="mr-2 text-accent" />
            Data Preview
            <span className="ml-2 text-xs px-2 py-0.5 bg-background rounded-full text-gray-400">
              {data.length} records
            </span>
          </h2>
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onRefresh}
              disabled={isLoading}
              className="text-gray-400 hover:text-white transition-colors" 
              title="Refresh Data"
            >
              <FaSyncAlt className={isLoading ? "animate-spin" : ""} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onOpenSettings}
              className="text-gray-400 hover:text-white transition-colors" 
              title="Display Settings"
            >
              <FaCog />
            </Button>
          </div>
        </div>

        {/* Preview Header */}
        <div className="bg-background rounded-t border border-border px-3 py-2 flex items-center text-xs font-medium">
          <div className="w-8 text-center">#</div>
          <div className="flex-1 grid grid-cols-4 gap-2">
            <div>Full Name</div>
            <div>Phone</div>
            <div>Address</div>
            <div>Passport</div>
          </div>
        </div>

        {/* Preview Content */}
        <div className={`preview-area bg-background border-x border-border p-3 max-h-96 overflow-y-auto custom-scrollbar ${getFontSizeClass()}`}>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-8" />
                  <div className="flex-1 grid grid-cols-4 gap-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`space-y-1.5 font-jetbrains text-xs`}>
              {data.length > 0 ? (
                data.map((person, index) => (
                  <div 
                    key={index} 
                    className={`flex hover:bg-card/20 rounded transition-colors ${getDensityClass()}`}
                  >
                    <div className="w-8 text-center text-gray-400">#{index + 1}</div>
                    <div className="flex-1 grid grid-cols-4 gap-2">
                      <div>{person.fullName}</div>
                      <div>{person.phone}</div>
                      <div>{person.address}</div>
                      <div>{person.passport}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-gray-400">
                  No data generated yet. Click "Generate Data" to start.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Preview Footer */}
        <div className="bg-background rounded-b border-x border-b border-border px-3 py-2 flex justify-between items-center text-xs text-gray-400">
          <div className="text-left">
            Generated with East-EU Data Generator
          </div>
          <div className="text-right">
            by @lisurgut
          </div>
        </div>
        
        {/* Status Bar */}
        <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center">
            <span className="w-2 h-2 bg-white rounded-full mr-1.5"></span>
            {isLoading ? "Generating data..." : "Ready to generate data"}
          </div>
          <div>
            Last generated: <span>{getLastGeneratedText()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
