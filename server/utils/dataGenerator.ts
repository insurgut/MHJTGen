import { GenerationOptions, PersonData } from "@shared/schema";
import { storage } from "../storage";
import { getAddressFormat } from "../data/countries";

export async function generateData(options: GenerationOptions): Promise<PersonData[]> {
  const result: PersonData[] = [];
  const countryData = storage.getCountryData(options.country);
  const addressFormat = getAddressFormat(options.country);
  
  // Generate the requested number of records
  for (let i = 0; i < options.recordsCount; i++) {
    // Determine gender based on genderRatio
    const isMale = Math.random() * 100 < options.genderRatio;
    
    // Generate person data
    let fullName = "";
    if (options.fields.name) {
      fullName = generateFullName(countryData, isMale, options.nameOptions);
    }
    
    let phone = "";
    if (options.fields.phone) {
      phone = generatePhone(countryData, addressFormat);
    }
    
    let address = "";
    if (options.fields.address) {
      address = generateAddress(countryData, addressFormat);
    }
    
    let passport = "";
    if (options.fields.passport) {
      passport = generatePassport(countryData, addressFormat);
    }
    
    result.push({
      id: i + 1,
      fullName,
      phone,
      address,
      passport
    });
  }
  
  return result;
}

function generateFullName(
  countryData: any,
  isMale: boolean,
  nameOptions: { firstName: boolean; lastName: boolean; patronymic: boolean }
): string {
  const parts: string[] = [];
  
  // Get the appropriate arrays based on gender
  const firstNames = isMale ? countryData.maleFirstNames : countryData.femaleFirstNames;
  const patronymics = isMale ? countryData.malePatronymics : countryData.femalePatronymics;
  const surnames = isMale ? countryData.maleSurnames : countryData.femaleSurnames;
  
  // Generate name components based on options
  if (nameOptions.lastName) {
    const surname = surnames[Math.floor(Math.random() * surnames.length)];
    parts.push(surname);
  }
  
  if (nameOptions.firstName) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    parts.push(firstName);
  }
  
  if (nameOptions.patronymic && patronymics.length > 0 && patronymics[0] !== "") {
    const patronymic = patronymics[Math.floor(Math.random() * patronymics.length)];
    parts.push(patronymic);
  }
  
  return parts.join(" ");
}

function generatePhone(countryData: any, addressFormat: any): string {
  const prefix = countryData.phonePrefixes[Math.floor(Math.random() * countryData.phonePrefixes.length)];
  const numbers = generateRandomDigits(7);
  
  return addressFormat.formatPhone(prefix, numbers);
}

function generateAddress(countryData: any, addressFormat: any): string {
  const city = countryData.cities[Math.floor(Math.random() * countryData.cities.length)];
  const street = countryData.streets[Math.floor(Math.random() * countryData.streets.length)];
  const building = Math.floor(Math.random() * 100) + 1;
  const apartment = Math.floor(Math.random() * 100) + 1;
  
  return addressFormat.formatAddress(city, street, building, apartment);
}

function generatePassport(countryData: any, addressFormat: any): string {
  const series = countryData.passportSeries[Math.floor(Math.random() * countryData.passportSeries.length)];
  const number = generateRandomDigits(6);
  
  return addressFormat.formatPassport(series, number);
}

function generateRandomDigits(length: number): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10).toString();
  }
  return result;
}
