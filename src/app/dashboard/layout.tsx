import { NavBarMobile } from "@/components/navigation/NavBarMobile";

import { NavBarDesktopWrapper } from "@/components/navigation/NavBarDestopWrapper";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-[100dvh] flex flex-col md:flex-row overflow-hidden">
      {/* Desktop Left Sidebar Menu */}
      <div className="hidden md:block h-full">
        <NavBarDesktopWrapper />
      </div>
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-16 md:pb-0 bg-gray-100">{children}</main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white">
        <NavBarMobile />
      </div>
    </div>
  );
}
