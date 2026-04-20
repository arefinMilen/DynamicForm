import { InputHTMLAttributes } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  id: string;
}

export function Input({ label, error, id, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        htmlFor={id}
        className="text-xs font-semibold text-slate-500 uppercase tracking-wide"
      >
        {label}
      </label>
      <input
        id={id}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={!!error}
        className={`
          w-full rounded-lg border px-3 py-2 text-sm text-slate-800
          placeholder:text-slate-300 bg-white transition-all duration-150
          focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
          ${error
            ? "border-red-300 bg-red-50/30 focus:ring-red-300"
            : "border-slate-200 hover:border-slate-300"
          }
          ${className}
        `}
        {...props}
      />
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.15 }}
            className="text-xs text-red-500 font-medium"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}