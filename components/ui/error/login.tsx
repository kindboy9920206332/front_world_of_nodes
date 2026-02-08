"use client";

import React, { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react"; // اختیاری: اگر lucide-react نصب داری

export type Status = "password" | "email";

interface Props {
  statusError: Status | null; // null یعنی هیچ اروری نیست
  onClose?: () => void; // اختیاری: برای بستن دستی
}

export default function ErrorLogin({ statusError, onClose }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (statusError) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(), 300); // صبر برای انیمیشن
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [statusError, onClose]);

  if (!statusError) return null;

  const errorMessages: Record<Status, string> = {
    email: "ایمیل وارد شده معتبر نیست یا پیدا نشد.",
    password: "رمز عبور اشتباه است. دوباره امتحان کنید.",
  };

  return (
    <div
      className={`fixed inset-x-4 top-4 z-50 mx-auto max-w-md transition-all duration-500 ease-out ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-16 opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="relative overflow-hidden rounded-2xl border border-danger/50 bg-background px-5 py-4 shadow-2xl backdrop-blur-md
                   ring-1 ring-danger/20"
      >
        {/* نوار قرمز بالای ارور (جذاب‌ترش می‌کنه) */}
        <div className="absolute inset-x-0 top-0 h-1 bg-danger" />

        <div className="flex items-start gap-4">
          {/* آیکون ارور */}
          <div className="flex-shrink-0">
            <AlertCircle className="h-6 w-6 text-danger mt-0.5" />
            {/* اگر lucide نداری، اینو بذار: */}
            {/* <div className="h-6 w-6 rounded-full bg-danger/20 flex items-center justify-center text-danger text-xl">!</div> */}
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-text text-base">ورود ناموفق</h3>
            <p className="mt-1 text-sm text-text/80 leading-relaxed">
              {errorMessages[statusError]}
            </p>
          </div>

          {/* دکمه بستن */}
          <button
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 text-text/50 hover:text-text transition-colors"
            aria-label="بستن"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* نوار پیشرفت (اختیاری – نشون میده چقدر مونده تا محو بشه) */}
        <div className="absolute bottom-0 left-0 h-0.5 w-full bg-danger/20">
          <div className="h-full w-full bg-danger origin-left animate-[shrink_5s_linear_forwards]" />
        </div>
      </div>
    </div>
  );
}