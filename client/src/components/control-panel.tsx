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
            <div className="w-full relative h-7">
              <input 
                type="range" 
                min="1" 
                max="1000" 
                value={options.recordsCount} 
                onChange={(e) => handleRecordsSliderChange(e.target.value)}
                className="w-full h-2 appearance-none rounded-full bg-gray-700 outline-none cursor-pointer" 
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${options.recordsCount/10}%, #374151 ${options.recordsCount/10}%, #374151 100%)`,
                  WebkitAppearance: 'none'
                }}
              />

            </div>
            <Input 
              type="number" 
              min="1" 
              max="1000" 
              value={recordsInputValue}
              onChange={(e) => handleRecordsInputChange(e.target.value)}
              className="w-20 bg-gray-800 border border-gray-700 rounded-md px-2 py-1 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-center" 
            />
          </div>
        </div>

        {/* Fields Selection */}
        <div className="mb-4">
          <Label className="block text-sm font-medium mb-2">Data Fields</Label>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-5 h-5 relative flex items-center justify-center">
                <Checkbox 
                  id="fieldName" 
                  checked={options.fields.name}
                  onCheckedChange={(checked) => 
                    setOptions({
                      ...options, 
                      fields: {...options.fields, name: !!checked}
                    })
                  }
                  className="h-5 w-5 rounded-md border-2 border-gray-600 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" 
                />
              </div>
              <label htmlFor="fieldName" className="ml-3 text-sm font-medium cursor-pointer">Full Name</label>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 relative flex items-center justify-center">
                <Checkbox 
                  id="fieldPhone" 
                  checked={options.fields.phone}
                  onCheckedChange={(checked) => 
                    setOptions({
                      ...options, 
                      fields: {...options.fields, phone: !!checked}
                    })
                  }
                  className="h-5 w-5 rounded-md border-2 border-gray-600 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" 
                />
              </div>
              <label htmlFor="fieldPhone" className="ml-3 text-sm font-medium cursor-pointer">Phone Number</label>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 relative flex items-center justify-center">
                <Checkbox 
                  id="fieldAddress" 
                  checked={options.fields.address}
                  onCheckedChange={(checked) => 
                    setOptions({
                      ...options, 
                      fields: {...options.fields, address: !!checked}
                    })
                  }
                  className="h-5 w-5 rounded-md border-2 border-gray-600 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" 
                />
              </div>
              <label htmlFor="fieldAddress" className="ml-3 text-sm font-medium cursor-pointer">Address</label>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 relative flex items-center justify-center">
                <Checkbox 
                  id="fieldPassport" 
                  checked={options.fields.passport}
                  onCheckedChange={(checked) => 
                    setOptions({
                      ...options, 
                      fields: {...options.fields, passport: !!checked}
                    })
                  }
                  className="h-5 w-5 rounded-md border-2 border-gray-600 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" 
                />
              </div>
              <label htmlFor="fieldPassport" className="ml-3 text-sm font-medium cursor-pointer">Passport Data</label>
            </div>
          </div>
        </div>

        {/* Name Options */}
        <div className="mb-4 border-t border-gray-700 pt-4">
          <Label className="block text-sm font-medium mb-2">Name Options</Label>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center">
              <div className="w-5 h-5 relative flex items-center justify-center">
                <Checkbox 
                  id="includeFirstName" 
                  checked={options.nameOptions.firstName}
                  onCheckedChange={(checked) => 
                    setOptions({
                      ...options, 
                      nameOptions: {...options.nameOptions, firstName: !!checked}
                    })
                  }
                  className="h-5 w-5 rounded-md border-2 border-gray-600 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" 
                />
              </div>
              <label htmlFor="includeFirstName" className="ml-3 text-sm font-medium cursor-pointer">First Name</label>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 relative flex items-center justify-center">
                <Checkbox 
                  id="includeLastName" 
                  checked={options.nameOptions.lastName}
                  onCheckedChange={(checked) => 
                    setOptions({
                      ...options, 
                      nameOptions: {...options.nameOptions, lastName: !!checked}
                    })
                  }
                  className="h-5 w-5 rounded-md border-2 border-gray-600 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" 
                />
              </div>
              <label htmlFor="includeLastName" className="ml-3 text-sm font-medium cursor-pointer">Last Name</label>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 relative flex items-center justify-center">
                <Checkbox 
                  id="includePatronymic" 
                  checked={options.nameOptions.patronymic}
                  onCheckedChange={(checked) => 
                    setOptions({
                      ...options, 
                      nameOptions: {...options.nameOptions, patronymic: !!checked}
                    })
                  }
                  className="h-5 w-5 rounded-md border-2 border-gray-600 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" 
                />
              </div>
              <label htmlFor="includePatronymic" className="ml-3 text-sm font-medium cursor-pointer">Patronymic</label>
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
          <div className="w-full relative h-7">
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={options.genderRatio} 
              onChange={(e) => setOptions({...options, genderRatio: parseInt(e.target.value, 10)})}
              className="w-full h-2 appearance-none rounded-full bg-gray-700 outline-none cursor-pointer" 
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${options.genderRatio}%, #374151 ${options.genderRatio}%, #374151 100%)`,
                WebkitAppearance: 'none'
              }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-400">{options.genderRatio}% male</span>
            <span className="text-xs text-gray-400">{100 - options.genderRatio}% female</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3">
          <Button 
            onClick={onGenerate}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-5 rounded-md flex justify-center items-center transition-colors shadow-md"
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
                <FaBolt className="mr-2 text-yellow-300" />
                Generate Data
              </>
            )}
          </Button>
          
          <div className="flex space-x-2">
            <Button 
              onClick={() => onExport('csv')}
              disabled={isLoading}
              variant="outline"
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-3 rounded-md border border-gray-700 flex items-center justify-center transition-colors shadow-sm"
            >
              <FaFileCsv className="mr-1.5 text-blue-400" />
              CSV
            </Button>
            <Button 
              onClick={() => onExport('txt')}
              disabled={isLoading}
              variant="outline"
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-3 rounded-md border border-gray-700 flex items-center justify-center transition-colors shadow-sm"
            >
              <FaFileAlt className="mr-1.5 text-green-400" />
              TXT
            </Button>
            <Button 
              onClick={onCopy}
              disabled={isLoading}
              variant="outline"
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-3 rounded-md border border-gray-700 flex items-center justify-center transition-colors shadow-sm"
            >
              <FaCopy className="mr-1.5 text-purple-400" />
              Copy
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
