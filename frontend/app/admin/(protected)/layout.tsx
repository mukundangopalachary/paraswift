import AdminProtectedRoute from "@/components/AdminProtectedRoute";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProtectedRoute>
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
        <AdminTopbar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </AdminProtectedRoute>
  );
}
