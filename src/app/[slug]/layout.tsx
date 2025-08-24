export default function MenuClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col md:flex-row h-[100dvh]">
      {/* Main Content Area */}
      <main className="flex-1  bg-gray-100">{children}</main>
    </div>
  );
}
