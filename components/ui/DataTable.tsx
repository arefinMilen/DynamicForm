"use client";

import { FormRow } from "@/types/form";

interface DataTableProps {
  rows: FormRow[];
}

export function DataTable({ rows }: DataTableProps) {
  const hasData = rows.some(
    (r) => r.name || r.email || r.role || r.department
  );

  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
        <h3 className="text-sm font-semibold text-slate-600">
          Live Preview Table
          <span className="ml-2 text-xs font-normal text-slate-400">
            Updates as you type
          </span>
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm" role="table" aria-label="Form data preview">
          <thead>
            <tr className="bg-slate-50/80">
              {["#", "Name", "Email", "Role", "Department"].map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, index) => (
              <tr
                key={row.id}
                className="hover:bg-slate-50/60 transition-colors duration-100"
              >
                <td className="px-4 py-3 text-slate-400 font-mono text-xs">
                  {String(index + 1).padStart(2, "0")}
                </td>
                <td className="px-4 py-3 font-medium text-slate-700">
                  {row.name || <span className="text-slate-300 italic">—</span>}
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {row.email || <span className="text-slate-300 italic">—</span>}
                </td>
                <td className="px-4 py-3">
                  {row.role ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {row.role}
                    </span>
                  ) : (
                    <span className="text-slate-300 italic">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {row.department || <span className="text-slate-300 italic">—</span>}
                </td>
              </tr>
            ))}
            {!hasData && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-slate-400 text-sm italic"
                >
                  Start filling out the form above to see data here
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}