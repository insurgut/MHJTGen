import { useState, useEffect } from "react";
import { DisplaySettings } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: DisplaySettings;
  onApply: (settings: DisplaySettings) => void;
}

export default function SettingsModal({ isOpen, onClose, settings, onApply }: SettingsModalProps) {
  const [localSettings, setLocalSettings] = useState<DisplaySettings>(settings);
  
  // Reset local settings when the modal opens
  useEffect(() => {
    if (isOpen) {
      setLocalSettings(settings);
    }
  }, [isOpen, settings]);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card rounded-lg w-full max-w-md p-5 border border-border">
        <DialogHeader className="flex justify-between items-center mb-4">
          <DialogTitle className="text-lg font-bold">Display Settings</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={18} />
          </Button>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label className="block text-sm font-medium mb-1.5">Display Density</Label>
            <Select 
              value={localSettings.density} 
              onValueChange={(value) => setLocalSettings({...localSettings, density: value as any})}
            >
              <SelectTrigger className="w-full bg-background border border-border rounded px-3 py-2 text-foreground focus:ring-1 focus:ring-accent">
                <SelectValue placeholder="Select density" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compact">Compact</SelectItem>
                <SelectItem value="comfortable">Comfortable</SelectItem>
                <SelectItem value="spacious">Spacious</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="block text-sm font-medium mb-1.5">Date Format</Label>
            <Select 
              value={localSettings.dateFormat} 
              onValueChange={(value) => setLocalSettings({...localSettings, dateFormat: value as any})}
            >
              <SelectTrigger className="w-full bg-background border border-border rounded px-3 py-2 text-foreground focus:ring-1 focus:ring-accent">
                <SelectValue placeholder="Select date format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DMY">DD.MM.YYYY (European)</SelectItem>
                <SelectItem value="MDY">MM/DD/YYYY (US)</SelectItem>
                <SelectItem value="YMD">YYYY-MM-DD (ISO)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="block text-sm font-medium mb-1.5">Font Size</Label>
            <div className="flex items-center space-x-3">
              <Input 
                type="range" 
                min="10" 
                max="16" 
                value={localSettings.fontSize} 
                onChange={(e) => setLocalSettings({...localSettings, fontSize: parseInt(e.target.value, 10)})}
                className="w-full" 
              />
              <span className="text-sm">{localSettings.fontSize}px</span>
            </div>
          </div>
        </div>
        
        <DialogFooter className="mt-5 flex justify-end space-x-3">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="bg-background hover:bg-background/90 text-foreground font-medium py-1.5 px-3 rounded border border-border transition-colors"
          >
            Cancel
          </Button>
          <Button 
            onClick={() => onApply(localSettings)}
            className="bg-accent hover:bg-accent/90 text-white font-medium py-1.5 px-3 rounded transition-colors"
          >
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
