import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "danger" | "ghost" | "success";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
  size?: "sm" | "md";
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200 border border-indigo-600",
  danger:
    "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 hover:border-red-300",
  ghost:
    "bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-300",
  success:
    "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-200 border border-emerald-600",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center gap-1.5 rounded-lg font-medium
        transition-all duration-150 focus:outline-none focus:ring-2
        focus:ring-indigo-400 focus:ring-offset-1 disabled:opacity-50
        disabled:cursor-not-allowed cursor-pointer
        ${variantStyles[variant]} ${sizeStyles[size]} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}