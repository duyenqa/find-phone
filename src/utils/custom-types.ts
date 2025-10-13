export interface IPhones {
    _id: string;
    phone: string;
    message: string;
    created_at: number;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}