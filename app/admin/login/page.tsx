export const dynamic = "force-dynamic";
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/lib/hooks/useAuth';
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/admin/dashboard');
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push('/admin/dashboard');
    } catch (error: any) {
      setError(error.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark-primary">
        <Loader2 className="h-8 w-8 animate-spin text-rose-mauve" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-dark-primary px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-cream">Panel de Administración</h1>
          <p className="mt-2 text-sm text-gray-400">Ingresa tus credenciales para continuar</p>
        </div>

        <div className="rounded-lg border border-dark-tertiary bg-dark-secondary p-8 shadow-elegant">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-4">
                <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-cream">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-dark-tertiary bg-dark-primary py-3 pl-10 pr-4 text-cream placeholder-gray-500 transition-elegant focus:border-rose-mauve focus:outline-none focus:ring-2 focus:ring-rose-mauve/20"
                  placeholder="admin@example.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-cream">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-dark-tertiary bg-dark-primary py-3 pl-10 pr-4 text-cream placeholder-gray-500 transition-elegant focus:border-rose-mauve focus:outline-none focus:ring-2 focus:ring-rose-mauve/20"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-burgundy px-6 py-3 font-medium text-cream shadow-elegant transition-elegant hover:bg-burgundy-light hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Iniciando sesión...</span>
                </>
              ) : (
                <span>Iniciar sesión</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
