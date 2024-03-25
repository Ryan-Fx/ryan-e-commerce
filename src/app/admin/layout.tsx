import SideNavbar from "@/components/admin/side-navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SideNavbar />
      <div className="p-2 w-full">{children}</div>
    </div>
  );
}
