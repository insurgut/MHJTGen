import { useState, useEffect } from "react";
import { GenerationOptions } from "@/types";
import { FaCog, FaBolt, FaFileCsv, FaFileAlt, FaCopy } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ControlPanelProps {
  options: GenerationOptions;
  setOptions: (options: GenerationOptions) => void;
  onGenerate: () => void;
  onExport: (format: 'csv' | 'txt') => void;
  onCopy: () => void;
  isLoading: boolean;
}

export default function ControlPanel({ 
  options, 
  setOptions, 
  onGenerate, 
  onExport, 
  onCopy,
  isLoading 
}: ControlPanelProps) {
  const [recordsInputValue, setRecordsInputValue] = useState(options.recordsCount.toString());
  
  // Update input field when slider changes
  useEffect(() => {
    setRecordsInputValue(options.recordsCount.toString());
  }, [options.recordsCount]);
  
  // Handle records count change from input
  const handleRecordsInputChange = (value: string) => {
    setRecordsInputValue(value);
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 1000) {
      setOptions({
        ...options,
        recordsCount: numValue
      });
    }
  };
  
  // Handle records count change from slider
  const handleRecordsSliderChange = (value: string) => {
    const numValue = parseInt(value, 10);
    setOptions({
      ...options,
      recordsCount: numValue
    });
  };
  
  return (
    <Card className="w-full md:w-1/3 bg-card rounded-lg border border-border">
      <CardContent className="p-4">
        <h2 className="text-lg font-bold mb-4 flex items-center">
          <FaCog className="mr-2 text-accent" />
          Generation Controls
        </h2>

        {/* Country Selection */}
        <div className="mb-4">
          <Label className="block text-sm font-medium mb-1.5" htmlFor="country">Country</Label>
          <Select 
            value={options.country} 
            onValueChange={(value) => setOptions({...options, country: value as any})}
          >
            <SelectTrigger className="w-full bg-background border border-border rounded px-3 py-2 text-foreground focus:ring-1 focus:ring-accent">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="russia">Russia</SelectItem>
              <SelectItem value="ukraine">Ukraine</SelectItem>
              <SelectItem value="poland">Poland</SelectItem>
              <SelectItem value="belarus">Belarus</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Number of Records */}
        <div className="mb-4">
          <Label className="block text-sm font-medium mb-1.5">Records Count</Label>
          <div className="flex items-center space-x-3">
            <Input 
              type="range" 
              min="1" 
              max="1000" 
              value={options.recordsCount} 
              onChange={(e) => handleRecordsSliderChange(e.target.value)}
              className="w-full" 
            />
            <Input 
              type="number" 
              min="1" 
              max="1000" 
              value={recordsInputValue}
              onChange={(e) => handleRecordsInputChange(e.target.value)}
              className="w-16 bg-background border border-border rounded px-2 py-1 text-foreground focus:outline-none focus:ring-1 focus:ring-accent" 
            />
          </div>
        </div>

        {/* Fields Selection */}
        <div className="mb-4">
          <Label className="block text-sm font-medium mb-2">Data Fields</Label>
          <div className="space-y-2">
            <div className="flex items-center">
              <Checkbox 
                id="fieldName" 
                checked={options.fields.name}
                onCheckedChange={(checked) => 
                  setOptions({
                    ...options, 
                    fields: {...options.fields, name: !!checked}
                  })
                }
                className="h-4 w-4 text-accent bg-background border-border rounded" 
              />
              <label htmlFor="fieldName" className="ml-2 text-sm">Full Name</label>
            </div>
            <div className="flex items-center">
              <Checkbox 
                id="fieldPhone" 
                checked={options.fields.phone}
                onCheckedChange={(checked) => 
                  setOptions({
                    ...options, 
                    fields: {...options.fields, phone: !!checked}
                  })
                }
                className="h-4 w-4 text-accent bg-background border-border rounded" 
              />
              <label htmlFor="fieldPhone" className="ml-2 text-sm">Phone Number</label>
            </div>
            <div className="flex items-center">
              <Checkbox 
                id="fieldAddress" 
                checked={options.fields.address}
                onCheckedChange={(checked) => 
                  setOptions({
                    ...options, 
                    fields: {...options.fields, address: !!checked}
                  })
                }
                className="h-4 w-4 text-accent bg-background border-border rounded" 
              />
              <label htmlFor="fieldAddress" className="ml-2 text-sm">Address</label>
            </div>
            <div className="flex items-center">
              <Checkbox 
                id="fieldPassport" 
                checked={options.fields.passport}
                onCheckedChange={(checked) => 
                  setOptions({
                    ...options, 
                    fields: {...options.fields, passport: !!checked}
                  })
                }
                className="h-4 w-4 text-accent bg-background border-border rounded" 
              />
              <label htmlFor="fieldPassport" className="ml-2 text-sm">Passport Data</label>
            </div>
          </div>
        </div>

        {/* Name Options */}
        <div className="mb-4 border-t border-border pt-4">
          <Label className="block text-sm font-medium mb-2">Name Options</Label>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center">
              <Checkbox 
                id="includeFirstName" 
                checked={options.nameOptions.firstName}
                onCheckedChange={(checked) => 
                  setOptions({
                    ...options, 
                    nameOptions: {...options.nameOptions, firstName: !!checked}
                  })
                }
                className="h-4 w-4 text-accent bg-background border-border rounded" 
              />
              <label htmlFor="includeFirstName" className="ml-2 text-sm">First Name</label>
            </div>
            <div className="flex items-center">
              <Checkbox 
                id="includeLastName" 
                checked={options.nameOptions.lastName}
                onCheckedChange={(checked) => 
                  setOptions({
                    ...options, 
                    nameOptions: {...options.nameOptions, lastName: !!checked}
                  })
                }
                className="h-4 w-4 text-accent bg-background border-border rounded" 
              />
              <label htmlFor="includeLastName" className="ml-2 text-sm">Last Name</label>
            </div>
            <div className="flex items-center">
              <Checkbox 
                id="includePatronymic" 
                checked={options.nameOptions.patronymic}
                onCheckedChange={(checked) => 
                  setOptions({
                    ...options, 
                    nameOptions: {...options.nameOptions, patronymic: !!checked}
                  })
                }
                className="h-4 w-4 text-accent bg-background border-border rounded" 
              />
              <label htmlFor="includePatronymic" className="ml-2 text-sm">Patronymic</label>
            </div>
          </div>
        </div>

        {/* Gender Distribution */}
        <div className="mb-6">
          <Label className="block text-sm font-medium mb-2">Gender Distribution</Label>
          <div className="flex items-center justify-between px-1">
            <span className="text-xs">Male</span>
            <span className="text-xs">Equal</span>
            <span className="text-xs">Female</span>
          </div>
          <Input 
            type="range" 
            min="0" 
            max="100" 
            value={options.genderRatio} 
            onChange={(e) => setOptions({...options, genderRatio: parseInt(e.target.value, 10)})}
            className="w-full" 
          />
          <div className="flex justify-between">
            <span className="text-xs text-gray-400">{options.genderRatio}%</span>
            <span className="text-xs text-gray-400">{100 - options.genderRatio}%</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3">
          <Button 
            onClick={onGenerate}
            disabled={isLoading}
            className="bg-accent hover:bg-accent/90 text-white font-medium py-2 px-4 rounded flex justify-center items-center transition-colors"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <FaBolt className="mr-2" />
                Generate Data
              </>
            )}
          </Button>
          
          <div className="flex space-x-2">
            <Button 
              onClick={() => onExport('csv')}
              disabled={isLoading}
              variant="outline"
              className="flex-1 bg-background hover:bg-background/90 text-foreground font-medium py-2 px-3 rounded border border-border flex items-center justify-center transition-colors"
            >
              <FaFileCsv className="mr-1.5" />
              CSV
            </Button>
            <Button 
              onClick={() => onExport('txt')}
              disabled={isLoading}
              variant="outline"
              className="flex-1 bg-background hover:bg-background/90 text-foreground font-medium py-2 px-3 rounded border border-border flex items-center justify-center transition-colors"
            >
              <FaFileAlt className="mr-1.5" />
              TXT
            </Button>
            <Button 
              onClick={onCopy}
              disabled={isLoading}
              variant="outline"
              className="flex-1 bg-background hover:bg-background/90 text-foreground font-medium py-2 px-3 rounded border border-border flex items-center justify-center transition-colors"
            >
              <FaCopy className="mr-1.5" />
              Copy
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
