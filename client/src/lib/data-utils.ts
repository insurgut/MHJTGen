import { PersonData } from "@/types";

export function formatDataForCSV(data: PersonData[]): string {
  // CSV header
  let csvContent = "# Eastern European Data Generator - Created by @lisurgut\n";
  csvContent += "ID,Full Name,Phone,Address,Passport\n";
  
  // CSV data rows
  data.forEach((person, index) => {
    csvContent += `${index + 1},"${person.fullName}","${person.phone}","${person.address}","${person.passport}"\n`;
  });
  
  // CSV footer
  csvContent += "# Generated with Eastern European Data Generator - @lisurgut\n";
  
  return csvContent;
}

export function formatDataForTXT(data: PersonData[]): string {
  // TXT header
  let txtContent = "# Eastern European Data Generator - Created by @lisurgut\n";
  txtContent += "#------------------------------------------------------#\n\n";
  
  // TXT data rows
  data.forEach((person, index) => {
    txtContent += `Record #${index + 1}\n`;
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
