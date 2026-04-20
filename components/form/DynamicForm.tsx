"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useFormLogic } from "@/hooks/useFormLogic";
import { FormRow } from "./FormRow";
import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import type { FormRow as FormRowType } from "@/types/form";
import {Plus,Check} from 'lucide-react';

export function DynamicForm() {
  const {
    rows,
    errors,
    submitted,
    addRow,
    removeRow,
    updateRow,
    handleSubmit,
    resetForm,
  } = useFormLogic();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            Dynamic Form Builder
          </div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            Team Member Registry
          </h1>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Add and manage team members with real-time validation and live table preview.
          </p>
        </div>

        {/* Success Banner */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4"
              role="status"
              aria-live="polite"
            >
              <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-emerald-800 text-sm">
                  Form submitted successfully!
                </p>
                <p className="text-emerald-600 text-xs">
                  {rows.length} record{rows.length !== 1 ? "s" : ""} saved.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-200/50 overflow-hidden">

          {/* Form Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <div>
              <h2 className="font-semibold text-slate-700 text-sm">
                Member Entries
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {rows.length} row{rows.length !== 1 ? "s" : ""} · All fields required
              </p>
            </div>
            <Button onClick={addRow} variant="primary" size="sm" aria-label="Add new row">
              <Plus />
              Add Row
            </Button>
          </div>

          {/* Rows */}
          <div className="p-6 space-y-4" role="list" aria-label="Form rows">
            <AnimatePresence mode="popLayout">
              {rows.map((row: FormRowType, index: number) => (
                <div key={row.id} role="listitem">
                  <FormRow
                    row={row}
                    index={index}
                    errors={errors[row.id] ?? {}}
                    onUpdate={updateRow}
                    onRemove={removeRow}
                    canRemove={rows.length > 1}
                  />
                </div>
              ))}
            </AnimatePresence>
          </div>

          {/* Form Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
            <Button onClick={resetForm} variant="ghost" size="md">
              Reset All
            </Button>
            <Button
              onClick={handleSubmit}
              variant="success"
              size="md"
              aria-label="Submit form"
            >
              <Check />
              Submit Form
            </Button>
          </div>
        </div>

        {/* Raw State Output */}
        {/* <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-sm font-semibold text-slate-600">
              Raw Form State
              <span className="ml-2 text-xs font-normal text-slate-400">
                Live JSON output
              </span>
            </h3>
          </div>
          <div className="p-5">
            <pre className="text-xs text-slate-600 bg-slate-50 rounded-lg p-4 overflow-x-auto leading-relaxed border border-slate-100 font-mono">
              {JSON.stringify(rows, null, 2)}
            </pre>
          </div>
        </div> */}

        {/* Data Table */}
        <DataTable rows={rows} />

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 pb-4">
          Built with Next.js · TypeScript · Tailwind CSS · Framer Motion
        </p>
      </div>
    </div>
  );
}