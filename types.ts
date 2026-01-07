export interface NavItem {
  label: string;
  id: string;
}

export interface ProblemItem {
  id: number;
  text: string;
}

export interface StepItem {
  step: number;
  title: string;
  description: string[];
}