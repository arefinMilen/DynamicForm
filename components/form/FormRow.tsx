"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import type { FormRow as FormRowType, RowErrors } from "@/types/form";
import { ROLE_OPTIONS } from "@/types/form";
import {Trash2} from 'lucide-react'
interface FormRowProps {
  row: FormRowType;
  index: number;
  errors: RowErrors;
  onUpdate: (id: string, field: keyof Omit<FormRowType, "id">, value: string) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}

const roleSelectOptions = ROLE_OPTIONS.map((r) => ({ label: r, value: r }));

export function FormRow({
  row,
  index,
  errors,
  onUpdate,
  onRemove,
  canRemove,
}: FormRowProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.96 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group relative bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200"
      role="group"
      aria-label={`Row ${index + 1}`}
    >
      {/* Row number badge */}
      <div className="absolute -top-3 left-4">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-sm">
          {index + 1}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-1">
        <Input
          id={`name-${row.id}`}
          label="Full Name"
          placeholder="e.g. Samsul Arefin"
          value={row.name}
          error={errors.name}
          onChange={(e) => onUpdate(row.id, "name", e.target.value)}
          aria-required="true"
        />
        <Input
          id={`email-${row.id}`}
          label="Email"
          type="email"
          placeholder="samsularefinmilen@gmail.com"
          value={row.email}
          error={errors.email}
          onChange={(e) => onUpdate(row.id, "email", e.target.value)}
          aria-required="true"
        />
        <Select
          id={`role-${row.id}`}
          label="Role"
          options={roleSelectOptions}
          value={row.role}
          error={errors.role}
          onChange={(e) => onUpdate(row.id, "role", e.target.value)}
          aria-required="true"
        />
        <Input
          id={`department-${row.id}`}
          label="Department"
          placeholder="e.g. Engineering"
          value={row.department}
          error={errors.department}
          onChange={(e) => onUpdate(row.id, "department", e.target.value)}
          aria-required="true"
        />
      </div>

      {canRemove && (
        <div className="absolute top-3 right-3">
          <Button
            variant="danger"
            size="sm"
            onClick={() => onRemove(row.id)}
            aria-label={`Delete row ${index + 1}`}
          >
            <Trash2 />
            Remove
          </Button>
        </div>
      )}
    </motion.div>
  );
}