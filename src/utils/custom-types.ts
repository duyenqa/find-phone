export interface IPhones {
    _id: string;
    phone: string;
    message: string;
    created_at: number;
}

export type Theme = 'light' | 'dark';
export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}