import { useState, useEffect } from "react";
import { GenerationOptions } from "@/types";
import { Settings, Zap, FileText, FileJson, Copy, Globe, User, Phone, MapPin, FileArchive, User2, Users, UserCircle, MoveRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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
    <Card className="w-full bg-card rounded-lg border border-border h-full shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Settings className="h-5 w-5 text-primary" />
          <span className="text-xs text-primary-foreground/50 bg-secondary px-2 py-0.5 rounded-full">
            Controls
          </span>
        </div>
        <CardTitle className="text-lg font-bold mt-1">Generation Settings</CardTitle>
        <CardDescription>Customize your data generation preferences</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-4">

        {/* Country Selection */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="h-4 w-4 text-primary" />
            <Label className="text-sm font-medium" htmlFor="country">Select Country</Label>
          </div>
          <Select 
            value={options.country} 
            onValueChange={(value) => setOptions({...options, country: value as any})}
          >
            <SelectTrigger className="w-full bg-background/50 border border-border rounded-md px-3 py-2 text-foreground hover:bg-background focus:ring-1 focus:ring-primary transition-colors">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="russia" className="focus:bg-primary/20">
                <div className="flex items-center gap-2">
                  <span className="w-6 text-center font-bold">🇷🇺</span>
                  <span>Russia</span>
                </div>
              </SelectItem>
              <SelectItem value="ukraine" className="focus:bg-primary/20">
                <div className="flex items-center gap-2">
                  <span className="w-6 text-center font-bold">🇺🇦</span>
                  <span>Ukraine</span>
                </div>
              </SelectItem>
              <SelectItem value="poland" className="focus:bg-primary/20">
                <div className="flex items-center gap-2">
                  <span className="w-6 text-center font-bold">🇵🇱</span>
                  <span>Poland</span>
                </div>
              </SelectItem>
              <SelectItem value="belarus" className="focus:bg-primary/20">
                <div className="flex items-center gap-2">
                  <span className="w-6 text-center font-bold">🇧🇾</span>
                  <span>Belarus</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Number of Records */}
        <div className="mb-6 pt-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <Label className="text-sm font-medium">Records Count</Label>
            </div>
            <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
              {options.recordsCount} records
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-full relative h-8">
              <input 
                type="range" 
                min="1" 
                max="1000" 
                value={options.recordsCount} 
                onChange={(e) => handleRecordsSliderChange(e.target.value)}
                className="w-full h-2 appearance-none rounded-full bg-background outline-none cursor-pointer" 
                style={{
                  background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${options.recordsCount/10}%, hsl(var(--secondary)) ${options.recordsCount/10}%, hsl(var(--secondary)) 100%)`,
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
              className="w-20 bg-background border border-border rounded-md px-2 py-1 text-foreground focus:outline-none focus:ring-1 focus:ring-primary text-center" 
            />
          </div>
          
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>Min: 1</span>
            <span>Max: 1000</span>
          </div>
        </div>

        {/* Fields Selection */}
        <div className="mb-6 pt-2">
          <div className="flex items-center gap-2 mb-3">
            <Settings className="h-4 w-4 text-primary" />
            <Label className="text-sm font-medium">Data Fields</Label>
          </div>
          
          <div className="grid grid-cols-1 gap-3 bg-background/50 rounded-lg p-3 border border-border">
            <div className="flex items-center justify-between py-1.5 px-2 hover:bg-secondary/30 rounded-md transition-colors">
              <div className="flex items-center gap-2">
                <UserCircle className="h-4 w-4 text-primary/70" />
                <label htmlFor="fieldName" className="text-sm font-medium cursor-pointer">Full Name</label>
              </div>
              <Checkbox 
                id="fieldName" 
                checked={options.fields.name}
                onCheckedChange={(checked) => 
                  setOptions({
                    ...options, 
                    fields: {...options.fields, name: !!checked}
                  })
                }
                className="h-5 w-5 rounded-md border-2 border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary" 
              />
            </div>
            
            <div className="flex items-center justify-between py-1.5 px-2 hover:bg-secondary/30 rounded-md transition-colors">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary/70" />
                <label htmlFor="fieldPhone" className="text-sm font-medium cursor-pointer">Phone Number</label>
              </div>
              <Checkbox 
                id="fieldPhone" 
                checked={options.fields.phone}
                onCheckedChange={(checked) => 
                  setOptions({
                    ...options, 
                    fields: {...options.fields, phone: !!checked}
                  })
                }
                className="h-5 w-5 rounded-md border-2 border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary" 
              />
            </div>
            
            <div className="flex items-center justify-between py-1.5 px-2 hover:bg-secondary/30 rounded-md transition-colors">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary/70" />
                <label htmlFor="fieldAddress" className="text-sm font-medium cursor-pointer">Address</label>
              </div>
              <Checkbox 
                id="fieldAddress" 
                checked={options.fields.address}
                onCheckedChange={(checked) => 
                  setOptions({
                    ...options, 
                    fields: {...options.fields, address: !!checked}
                  })
                }
                className="h-5 w-5 rounded-md border-2 border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary" 
              />
            </div>
            
            <div className="flex items-center justify-between py-1.5 px-2 hover:bg-secondary/30 rounded-md transition-colors">
              <div className="flex items-center gap-2">
                <FileArchive className="h-4 w-4 text-primary/70" />
                <label htmlFor="fieldPassport" className="text-sm font-medium cursor-pointer">Passport Data</label>
              </div>
              <Checkbox 
                id="fieldPassport" 
                checked={options.fields.passport}
                onCheckedChange={(checked) => 
                  setOptions({
                    ...options, 
                    fields: {...options.fields, passport: !!checked}
                  })
                }
                className="h-5 w-5 rounded-md border-2 border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary" 
              />
            </div>
          </div>
        </div>

        {/* Name Options */}
        <div className="mb-6 pt-2">
          <div className="flex items-center gap-2 mb-3">
            <User className="h-4 w-4 text-primary" />
            <Label className="text-sm font-medium">Name Components</Label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-background/50 rounded-lg p-3 border border-border">
            <div className="flex items-center justify-between py-1.5 px-2 hover:bg-secondary/30 rounded-md transition-colors">
              <label htmlFor="includeFirstName" className="text-sm font-medium cursor-pointer">First Name</label>
              <Checkbox 
                id="includeFirstName" 
                checked={options.nameOptions.firstName}
                onCheckedChange={(checked) => 
                  setOptions({
                    ...options, 
                    nameOptions: {...options.nameOptions, firstName: !!checked}
                  })
                }
                className="h-5 w-5 rounded-md border-2 border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary" 
              />
            </div>
            
            <div className="flex items-center justify-between py-1.5 px-2 hover:bg-secondary/30 rounded-md transition-colors">
              <label htmlFor="includeLastName" className="text-sm font-medium cursor-pointer">Last Name</label>
              <Checkbox 
                id="includeLastName" 
                checked={options.nameOptions.lastName}
                onCheckedChange={(checked) => 
                  setOptions({
                    ...options, 
                    nameOptions: {...options.nameOptions, lastName: !!checked}
                  })
                }
                className="h-5 w-5 rounded-md border-2 border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary" 
              />
            </div>
            
            <div className="flex items-center justify-between py-1.5 px-2 hover:bg-secondary/30 rounded-md transition-colors">
              <label htmlFor="includePatronymic" className="text-sm font-medium cursor-pointer">Patronymic</label>
              <Checkbox 
                id="includePatronymic" 
                checked={options.nameOptions.patronymic}
                onCheckedChange={(checked) => 
                  setOptions({
                    ...options, 
                    nameOptions: {...options.nameOptions, patronymic: !!checked}
                  })
                }
                className="h-5 w-5 rounded-md border-2 border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary" 
              />
            </div>
          </div>
        </div>

        {/* Gender Distribution */}
        <div className="mb-6 pt-2">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <Label className="text-sm font-medium">Gender Distribution</Label>
            </div>
            <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
              {options.genderRatio === 50 ? "Equal" : `${options.genderRatio}% Male`}
            </span>
          </div>
          
          <div className="relative px-2 py-3 bg-background/50 rounded-lg border border-border">
            <div className="flex items-center justify-between px-1 text-xs text-muted-foreground mb-2">
              <span>Male</span>
              <span>50/50</span>
              <span>Female</span>
            </div>
            
            <div className="w-full relative h-8">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={options.genderRatio} 
                onChange={(e) => setOptions({...options, genderRatio: parseInt(e.target.value, 10)})}
                className="w-full h-2 appearance-none rounded-full bg-background outline-none cursor-pointer" 
                style={{
                  background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${options.genderRatio}%, hsl(var(--secondary)) ${options.genderRatio}%, hsl(var(--secondary)) 100%)`,
                  WebkitAppearance: 'none'
                }}
              />
            </div>
            
            <div className="flex justify-between mt-2 text-xs">
              <div className="flex items-center text-primary">
                <User2 className="h-3.5 w-3.5 mr-1" />
                <span>{options.genderRatio}%</span>
              </div>
              <div className="flex items-center text-secondary">
                <User2 className="h-3.5 w-3.5 mr-1" />
                <span>{100 - options.genderRatio}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-4 mt-2">
          <Button 
            onClick={onGenerate}
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-5 rounded-md flex justify-center items-center transition-all shadow-md border border-primary/20"
            size="lg"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Zap className="mr-2 h-5 w-5 text-white" />
                <span>Generate Data</span>
              </>
            )}
          </Button>
          
          <div className="grid grid-cols-3 gap-2">
            <Button 
              onClick={() => onExport('csv')}
              disabled={isLoading}
              variant="outline"
              className="bg-background hover:bg-secondary text-foreground py-2 px-3 rounded-md border border-border flex items-center justify-center transition-colors shadow-sm"
            >
              <FileJson className="mr-1.5 h-4 w-4" />
              <span>CSV</span>
            </Button>
            <Button 
              onClick={() => onExport('txt')}
              disabled={isLoading}
              variant="outline"
              className="bg-background hover:bg-secondary text-foreground py-2 px-3 rounded-md border border-border flex items-center justify-center transition-colors shadow-sm"
            >
              <FileText className="mr-1.5 h-4 w-4" />
              <span>TXT</span>
            </Button>
            <Button 
              onClick={onCopy}
              disabled={isLoading}
              variant="outline"
              className="bg-background hover:bg-secondary text-foreground py-2 px-3 rounded-md border border-border flex items-center justify-center transition-colors shadow-sm"
            >
              <Copy className="mr-1.5 h-4 w-4" />
              <span>Copy</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
