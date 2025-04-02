export interface GenerationOptions {
  country: 'russia' | 'ukraine' | 'poland' | 'belarus';
  recordsCount: number;
  fields: {
    name: boolean;
    phone: boolean;
    address: boolean;
    passport: boolean;
  };
  nameOptions: {
    firstName: boolean;
    lastName: boolean;
    patronymic: boolean;
  };
  genderRatio: number; // 0-100, represents % male
}

export interface PersonData {
  id: number;
  fullName: string;
  phone: string;
  address: string;
  passport: string;
}

export interface DisplaySettings {
  density: 'compact' | 'comfortable' | 'spacious';
  dateFormat: 'DMY' | 'MDY' | 'YMD';
  fontSize: number;
}

export interface ToastState {
  visible: boolean;
  message: string;
  type: 'success' | 'accent';
}
