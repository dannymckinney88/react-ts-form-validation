export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

export interface FormErrors {
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
}

export interface TouchedFields {
  name?: boolean;
  username?: boolean;
  email?: boolean;
  phone?: boolean;
}
