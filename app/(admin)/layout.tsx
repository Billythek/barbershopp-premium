import { AdminSidebar } from "@/components/admin/AdminSidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto bg-cream-50">
        <div className="container mx-auto p-8 max-w-[1920px]">
          {children}
        </div>
      </main>
    </div>
  )
}
