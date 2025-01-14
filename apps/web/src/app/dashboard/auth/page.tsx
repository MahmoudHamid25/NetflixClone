import { AuthForm } from '@/components/dashboard/auth/auth-form';

export default function AuthPage() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="max-w-4xl border rounded-xl p-10 flex flex-col gap-4">
        <p className="text-xl">Login</p>
        <AuthForm />
      </div>
    </div>
  );
}