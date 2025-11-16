"use client";

import "@/app/globals.css";
import Sidebar from "@/components/sidebar";
import Topbar from "@/components/topbar";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";

function ContentWrapper({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <main
      className={`
        pt-20 px-6 py-0 transition-all duration-300
        ${collapsed ? "pl-20" : "pl-64"}
      `}
    >
      {children}
    </main>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-ns-bg text-ns-text dark:bg-ns-bg-dark dark:text-ns-text-dark">
        <SidebarProvider>
          {/* Fixed Sidebar */}
          <Sidebar />

          {/* Fixed Topbar (auto-responsiveness handled inside topbar.tsx) */}
          <Topbar />

          {/* Main Content */}
          <ContentWrapper>{children}</ContentWrapper>
        </SidebarProvider>
      </body>
    </html>
  );
}
