export type Role = "Engineer" | "Designer" | "Manager" | "QA" | "DevOps";

export interface FormRow {
  id: string;
  name: string;
  email: string;
  role: Role | "";
  department: string;
}

export interface RowErrors {
  name?: string;
  email?: string;
  role?: string;
  department?: string;
}

export type FormErrors = Record<string, RowErrors>;

export const ROLE_OPTIONS: Role[] = [
  "Engineer",
  "Designer",
  "Manager",
  "QA",
  "DevOps",
];