import { CountryData } from "../storage";

// Base interface for country-specific address formats
export interface AddressFormat {
  formatAddress: (city: string, street: string, building: number, apartment: number) => string;
  formatPhone: (prefix: string, numbers: string) => string;
  formatPassport: (series: string, number: string) => string;
}

// Russian address format
export const russianFormat: AddressFormat = {
  formatAddress: (city, street, building, apartment) => {
    return `г. ${city}, ул. ${street}, д. ${building}, кв. ${apartment}`;
  },
  formatPhone: (prefix, numbers) => {
    return `+7 ${prefix} ${numbers.substring(0, 3)}-${numbers.substring(3, 5)}-${numbers.substring(5, 7)}`;
  },
  formatPassport: (series, number) => {
    return `${series} ${number}`;
  }
};

// Ukrainian address format
export const ukrainianFormat: AddressFormat = {
  formatAddress: (city, street, building, apartment) => {
    return `м. ${city}, вул. ${street}, буд. ${building}, кв. ${apartment}`;
  },
  formatPhone: (prefix, numbers) => {
    return `+380 ${prefix} ${numbers.substring(0, 3)}-${numbers.substring(3, 5)}-${numbers.substring(5, 7)}`;
  },
  formatPassport: (series, number) => {
    return `${series}${number}`;
  }
};

// Polish address format
export const polishFormat: AddressFormat = {
  formatAddress: (city, street, building, apartment) => {
    return `ul. ${street} ${building}/${apartment}, ${city}`;
  },
  formatPhone: (prefix, numbers) => {
    return `+48 ${prefix} ${numbers.substring(0, 3)} ${numbers.substring(3, 6)} ${numbers.substring(6, 9)}`;
  },
  formatPassport: (series, number) => {
    return `${series}${number}`;
  }
};

// Belarusian address format
export const belarusianFormat: AddressFormat = {
  formatAddress: (city, street, building, apartment) => {
    return `г. ${city}, ул. ${street}, д. ${building}, кв. ${apartment}`;
  },
  formatPhone: (prefix, numbers) => {
    return `+375 ${prefix} ${numbers.substring(0, 3)}-${numbers.substring(3, 5)}-${numbers.substring(5, 7)}`;
  },
  formatPassport: (series, number) => {
    return `${series}${number}`;
  }
};

// Helper function to get the format for a specific country
export function getAddressFormat(country: string): AddressFormat {
  switch (country) {
    case 'ukraine':
      return ukrainianFormat;
    case 'poland':
      return polishFormat;
    case 'belarus':
      return belarusianFormat;
    case 'russia':
    default:
      return russianFormat;
  }
}
