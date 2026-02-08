"use client";

import React from "react";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-dark text-light flex items-center justify-center p-4">
      <div className="absolute inset-0 from-dark/60 via-dark/50 to-dark/40 pointer-events-none" />

      <div className="relative w-full max-w-md rounded-3xl border border-dark/40 bg-dark/80 backdrop-blur-lg px-8 py-10 shadow-2xl ring-1 ring-white/5 transform transition-all hover:scale-105 hover:shadow-xl">
        <div className="mb-8 text-center">
          <div className="text-xs tracking-widest text-text uppercase">World of Nodes</div>
          <h1 className="mt-3 text-3xl font-extrabold text-light">{title}</h1>
          {subtitle && (
            <p className="mt-3 text-sm text-light/70 leading-relaxed">{subtitle}</p>
          )}z
          <div className="mt-5 h-px  from-primary/40 via-secondary/40 to-primary/40" />
        </div>
        {children}
        <div className="mt-8 text-center text-xs text-light/50">
        </div>
      </div>
    </div>
  );
}

export function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <div className="mb-2 text-xs font-medium uppercase tracking-wider text-light/80">{label}</div>
      <input
        className="w-full rounded-xl border border-dark/50 bg-dark/60 px-4 py-3 text-sm text-light outline-none transition-all
                   placeholder:text-light/40 focus:border-primary focus:ring-1 focus:ring-primary/30 focus:bg-dark/80 hover:ring-2"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
    </label>
  );
}

export function PrimaryButton({
  children,
  onClick,
  type = "button",
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="w-full rounded-xl bg-primary text-light border border-primary py-3.5 text-sm font-semibold cursor-pointer
                 transition-all duration-200 hover:bg-primary/80 hover:shadow-lg  active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full rounded-xl border cursor-pointer border-dark/60 bg-transparent py-3.5 text-sm font-medium text-text
                 transition-all duration-200 hover:bg-primary/10 hover:border-primary hover:scale-105 active:scale-[0.98]"
    >
      {children}
    </button>
  );
}
 
