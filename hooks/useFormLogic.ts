import { useState, useCallback, useId, useRef } from "react";
import type { FormRow, FormErrors, RowErrors, Role } from "@/types/form";

const validateEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export function useFormLogic() {
  const formId = useId();
  const rowCounterRef = useRef(0);

  const createEmptyRow = (): FormRow => ({
    id: `${formId}-row-${rowCounterRef.current++}`,
    name: "",
    email: "",
    role: "",
    department: "",
  });

  const [rows, setRows] = useState<FormRow[]>([createEmptyRow()]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const addRow = useCallback(() => {
    setRows((prev) => [...prev, createEmptyRow()]);
  }, []);

  const removeRow = useCallback((id: string) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const updateRow = useCallback(
    (id: string, field: keyof Omit<FormRow, "id">, value: string) => {
      setRows((prev) =>
        prev.map((row) =>
          row.id === id
            ? {
                ...row,
                [field]: field === "role" ? (value as Role | "") : value,
              }
            : row,
        ),
      );

      // Clear error on change
      if (errors[id]?.[field as keyof RowErrors]) {
        setErrors((prev) => ({
          ...prev,
          [id]: { ...prev[id], [field]: undefined },
        }));
      }
    },
    [errors],
  );

  const validateAll = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    rows.forEach((row) => {
      const rowErrors: RowErrors = {};

      if (!row.name.trim()) {
        rowErrors.name = "Name is required";
        isValid = false;
      }
      if (!row.email.trim()) {
        rowErrors.email = "Email is required";
        isValid = false;
      } else if (!validateEmail(row.email)) {
        rowErrors.email = "Enter a valid email";
        isValid = false;
      }
      if (!row.role) {
        rowErrors.role = "Role is required";
        isValid = false;
      }
      if (!row.department.trim()) {
        rowErrors.department = "Department is required";
        isValid = false;
      }

      if (Object.keys(rowErrors).length > 0) {
        newErrors[row.id] = rowErrors;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [rows]);

  const handleSubmit = useCallback(() => {
    const valid = validateAll();
    setSubmitted(valid);
    return valid;
  }, [validateAll]);

  const resetForm = useCallback(() => {
    setRows([createEmptyRow()]);
    setErrors({});
    setSubmitted(false);
  }, []);

  return {
    rows,
    errors,
    submitted,
    addRow,
    removeRow,
    updateRow,
    handleSubmit,
    resetForm,
  };
}
