import { PersonData, DisplaySettings } from "@/types";
import { format } from "date-fns";
import { Database, RotateCw, Settings, Table, Info, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

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
    <Card className="w-full bg-card rounded-lg border border-border h-full shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Database className="h-5 w-5 text-primary" />
          <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-0">
            {data.length} records
          </Badge>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-bold mt-1">Data Preview</CardTitle>
            <CardDescription>Generated Eastern European Data</CardDescription>
          </div>
          <div className="flex space-x-1">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onRefresh}
              disabled={isLoading}
              className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors rounded-full" 
              title="Refresh Data"
            >
              <RotateCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onOpenSettings}
              className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors rounded-full" 
              title="Display Settings"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-4">

        {/* Preview Table */}
        <div className="bg-card/30 rounded-lg border border-border overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="bg-secondary/70 px-3 py-2 flex items-center text-xs font-medium text-primary">
            <div className="w-10 text-center">#</div>
            <div className="flex-1 grid grid-cols-4 gap-2">
              <div>Full Name</div>
              <div>Phone</div>
              <div>Address</div>
              <div>Passport</div>
            </div>
          </div>

          {/* Table Content */}
          <div className={`p-0 bg-background/30 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent ${getFontSizeClass()}`}>
            {isLoading ? (
              <div className="space-y-0 p-3">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="flex items-center space-x-2 py-2">
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
              <div className={`font-mono text-xs`}>
                {data.length > 0 ? (
                  data.map((person, index) => (
                    <div 
                      key={index} 
                      className={`flex border-b last:border-0 border-border/40 hover:bg-secondary/10 transition-colors ${getDensityClass()}`}
                    >
                      <div className="w-10 text-center text-muted-foreground px-3">{index + 1}</div>
                      <div className="flex-1 grid grid-cols-4 gap-2">
                        <div className="truncate">{person.fullName}</div>
                        <div className="font-medium text-primary/80">{person.phone}</div>
                        <div className="truncate">{person.address}</div>
                        <div className="font-medium">{person.passport}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-20 px-4 text-center text-muted-foreground flex flex-col items-center justify-center">
                    <Table className="h-8 w-8 mb-2 text-muted-foreground/50" />
                    <p>No data has been generated yet.</p>
                    <p className="text-muted-foreground/70 text-xs mt-1">Click "Generate Data" to create new records.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Table Footer */}
          <div className="bg-secondary/20 px-3 py-2 flex justify-between items-center text-xs text-muted-foreground">
            <div className="text-left flex items-center gap-1">
              <Info className="h-3 w-3" />
              <span>Eastern European Data Generator</span>
            </div>
            <div className="text-right">
              {lastGenerated && 
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Updated: {getLastGeneratedText()}</span>
                </div>
              }
            </div>
          </div>
        </div>
        
        {/* Status Bar */}
        <div className="mt-2 px-3 py-2 rounded-lg bg-secondary/10 border border-border flex items-center justify-between text-xs">
          <div className="flex items-center">
            <span className={`w-2 h-2 ${isLoading ? 'bg-yellow-500 animate-pulse' : 'bg-primary'} rounded-full mr-1.5`}></span>
            <span className="text-muted-foreground">
              {isLoading ? "Processing..." : "Ready"}
            </span>
          </div>
          <div className="flex gap-2">
            {data.length > 0 && (
              <Badge variant="outline" className="bg-primary/5 hover:bg-primary/10 border-0 transition-colors">
                {data.length} records
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
