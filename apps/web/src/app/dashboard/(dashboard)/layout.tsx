import DashboardLayout from '@/components/dashboard/layout/dashboard-layout';
import { UserProvider } from '@/components/dashboard/layout/user-context';

export default async function DLayout({
                                           children,
                                         }: {
  children: React.ReactNode
}) {
  return (
    <UserProvider>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </UserProvider>
  );
}