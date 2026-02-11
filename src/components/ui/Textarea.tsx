import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-slate-700 ml-1">
          {label}
        </label>
      )}
      <textarea
        className={`
          px-4 py-3 rounded-xl border border-slate-200
          bg-white text-slate-900 shadow-sm resize-none
          placeholder:text-slate-400
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
          transition-all duration-200 min-h-[150px]
          disabled:bg-slate-50 disabled:text-slate-500
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
    </div>
  );
}