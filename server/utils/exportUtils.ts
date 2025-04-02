import { PersonData } from "@shared/schema";

export function exportToCSV(data: PersonData[]): string {
  // CSV header
  let csvContent = "# Eastern European Data Generator - Created by @lisurgut\n";
  csvContent += "ID,Full Name,Phone,Address,Passport\n";
  
  // CSV data rows
  data.forEach((person) => {
    csvContent += `${person.id},"${person.fullName}","${person.phone}","${person.address}","${person.passport}"\n`;
  });
  
  // CSV footer
  csvContent += "# Generated with Eastern European Data Generator - @lisurgut\n";
  
  return csvContent;
}

export function exportToTXT(data: PersonData[]): string {
  // TXT header
  let txtContent = "# Eastern European Data Generator - Created by @lisurgut\n";
  txtContent += "#------------------------------------------------------#\n\n";
  
  // TXT data rows
  data.forEach((person) => {
    txtContent += `Record #${person.id}\n`;
    txtContent += `Full Name: ${person.fullName}\n`;
    txtContent += `Phone: ${person.phone}\n`;
    txtContent += `Address: ${person.address}\n`;
    txtContent += `Passport: ${person.passport}\n\n`;
  });
  
  // TXT footer
  txtContent += "#------------------------------------------------------#\n";
  txtContent += "# Generated with Eastern European Data Generator - @lisurgut\n";
  
  return txtContent;
}
