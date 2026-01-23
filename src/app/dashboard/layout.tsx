"use client";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MainHeader } from "@/components/header/header";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <MainHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="h-full overflow-auto w-full">{children}</main>
      </div>
    </div>
  );
}
