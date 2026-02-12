"use client";

import EmployeeManagement from "@/components/pages/employee/management";
import NavbarEmployee from "@/components/pages/employee/navbarEmployee";
import TableNodesInHome from "@/components/pages/home/tableNodes";
import TableOrdersInHome from "@/components/pages/home/tableOrders";
import { useMemo, useState } from "react";

// تعریف تایپ‌ها
type PageId = "orders" | "nodes" | "management" | "join_request" | "actions";

export default function EmployeePage() {
  const [selectPage, setSelectPage] = useState<PageId>("management");

  // تعریف صفحات در useMemo برای بهینه سازی
  const pages = useMemo(
    () => ({
      management: <EmployeeManagement />,
      orders: <TableOrdersInHome />,
      nodes: <TableNodesInHome />,
      // اضافه کردن مقدار پیش‌فرض برای مواردی که هنوز ساخته نشده‌اند تا ارور ندهد
      join_request: <div className="p-4 opacity-50">Join Requests coming soon...</div>,
      actions: <div className="p-4 opacity-50">Actions coming soon...</div>,
    }),
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-zinc-100 flex items-start justify-center px-4 py-10">
      <div className="w-full max-w-7xl">
        {/* Title Section */}
        <div className="flex justify-center items-center flex-col gap-2 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            World of Nodes
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Manage your nodes, orders, and settings from one place.
          </p>
        </div>

        {/* Navigation Section */}
        <div className="mt-8 px-2 sm:px-6">
          <NavbarEmployee itemProp={selectPage} setItemProp={setSelectPage} />
        </div>

        {/* Content Section */}
        <div className="mt-6 rounded-3xl max-h-[calc(100vh-300px)] overflow-auto p-4 sm:p-6 ">
          {/* نمایش صفحه انتخاب شده یا یک پیام پیش‌فرض در صورت نبود صفحه */}
          {pages[selectPage] || <div className="p-10 text-center opacity-50">Page not found.</div>}
        </div>
      </div>
    </div>
  );
}