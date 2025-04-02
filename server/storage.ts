import { users, type User, type InsertUser } from "@shared/schema";
import { russianData } from "./data/russianData";
import { ukrainianData } from "./data/ukrainianData";
import { polishData } from "./data/polishData";
import { belarusianData } from "./data/belarusianData";

// Define an interface for country data storage
export interface CountryData {
  maleFirstNames: string[];
  femaleFirstNames: string[];
  malePatronymics: string[];
  femalePatronymics: string[];
  maleSurnames: string[];
  femaleSurnames: string[];
  cities: string[];
  streets: string[];
  phonePrefixes: string[];
  regions: string[];
  postalCodes: string[];
  passportSeries: string[];
}

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Data methods
  getCountryData(country: string): CountryData;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private countryData: Map<string, CountryData>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.countryData = new Map();
    this.currentId = 1;
    
    // Initialize country data
    this.countryData.set('russia', russianData);
    this.countryData.set('ukraine', ukrainianData);
    this.countryData.set('poland', polishData);
    this.countryData.set('belarus', belarusianData);
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  getCountryData(country: string): CountryData {
    return this.countryData.get(country) || russianData; // Default to Russia if country not found
  }
}

export const storage = new MemStorage();
