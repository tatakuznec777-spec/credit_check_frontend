// src/types/index.ts

export type ProgramType = 'federal' | 'regional';

export interface ProgramOption {
  value: ProgramType;
  label: string;
}

export const PROGRAM_OPTIONS: ProgramOption[] = [
  { value: 'federal', label: 'Федеральная' },
  { value: 'regional', label: 'Областная' },
];

export const ALLOWED_EXTENSIONS = ['.pdf', '.docx', '.jpg', '.jpeg', '.png'];