import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateData } from "./utils/dataGenerator";
import { exportToCSV, exportToTXT } from "./utils/exportUtils";
import { GenerationOptions, PersonData, exportRequest } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for generating data
  app.get("/api/generate", async (req, res) => {
    try {
      const country = req.query.country as string || 'russia';
      const count = parseInt(req.query.count as string || '10', 10);
      
      // Parse JSON fields from query params
      let fields = {
        name: true,
        phone: true,
        address: true,
        passport: true
      };
      
      let nameOptions = {
        firstName: true,
        lastName: true,
        patronymic: true
      };
      
      if (req.query.fields) {
        try {
          fields = JSON.parse(req.query.fields as string);
        } catch (e) {
          console.error("Error parsing fields:", e);
        }
      }
      
      if (req.query.nameOptions) {
        try {
          nameOptions = JSON.parse(req.query.nameOptions as string);
        } catch (e) {
          console.error("Error parsing nameOptions:", e);
        }
      }
      
      const genderRatio = parseInt(req.query.genderRatio as string || '50', 10);
      
      const options: GenerationOptions = {
        country: country as any,
        recordsCount: count,
        fields,
        nameOptions,
        genderRatio
      };
      
      const data = await generateData(options);
      
      res.json(data);
    } catch (error) {
      console.error("Error generating data:", error);
      res.status(500).json({ message: "Failed to generate data" });
    }
  });
  
  // API route for exporting data
  app.post("/api/export", async (req, res) => {
    try {
      const { format, data } = req.body as ExportRequest;
      
      if (!data || !Array.isArray(data) || data.length === 0) {
        return res.status(400).json({ message: "No data provided for export" });
      }
      
      let exportData: string;
      let contentType: string;
      let filename: string;
      
      if (format === 'csv') {
        exportData = exportToCSV(data);
        contentType = 'text/csv';
        filename = 'eastern-european-data.csv';
      } else {
        exportData = exportToTXT(data);
        contentType = 'text/plain';
        filename = 'eastern-european-data.txt';
      }
      
      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.send(exportData);
    } catch (error) {
      console.error("Error exporting data:", error);
      res.status(500).json({ message: "Failed to export data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

interface ExportRequest {
  format: 'csv' | 'txt';
  data: PersonData[];
  options: GenerationOptions;
}
