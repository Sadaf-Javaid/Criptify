import { create } from "zustand";

type PasswordStore = {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  passwordLength: string;
  password: string;
  isCopied: boolean;
  strength: number;
  strengthLabel: string;
  setUppercase: (value: boolean) => void;
  setLowercase: (value: boolean) => void;
  setNumbers: (value: boolean) => void;
  setSymbols: (value: boolean) => void;
  setPasswordLength: (value: string) => void;
  setPassword: (value: string) => void;
  setIsCopied: (value: boolean) => void;
  setStrength: (strength: number) => void;
  setStrengthLabel: (label: string) => void;
};

export const usePasswordStore = create<PasswordStore>((set) => ({
  uppercase: false,
  lowercase: false,
  numbers: false,
  symbols: false,
  passwordLength: "8",
  password: '',
  isCopied: false,
  strength: 0,
  strengthLabel: "Too Weak",
  setUppercase: (value) => set({ uppercase: value }),
  setLowercase: (value) => set({ lowercase: value }),
  setNumbers: (value) => set({ numbers: value }),
  setSymbols: (value) => set({ symbols: value }),
  setPasswordLength: (value) => set({ passwordLength: value }),
  setPassword: (value) => set({ password: value }),
  setIsCopied: (value) => set({ isCopied: value }),
  setStrength: (strength) => set({ strength }),
  setStrengthLabel: (label) => set({ strengthLabel: label }),
}));
