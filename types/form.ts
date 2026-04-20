export type Role = "Engineer" | "Designer" | "Manager" | "QA" | "DevOps";

export interface FormRow {
  id: string;
  name: string;
  email: string;
  role: Role | "";
  department: string;
}

export interface RoleColor {
  bg: string;
  text: string;
  border: string;
}

export const ROLE_COLORS: Record<Role, RoleColor> = {
  Engineer: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-100",
  },
  Designer: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-100",
  },
  Manager: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-100",
  },
  QA: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-100",
  },
  DevOps: {
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-100",
  },
};

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
