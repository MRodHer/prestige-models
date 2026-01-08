'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { ArrowLeft, Loader2 } from 'lucide-react';
import ModelForm from '@/components/ModelForm';

export default function NuevoModeloPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark-primary">
        <Loader2 className="h-8 w-8 animate-spin text-rose-mauve" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-primary">
      <header className="border-b border-dark-tertiary bg-dark-secondary">
        <div className="mx-auto max-w-4xl px-6 py-6">
          <button
            onClick={() => router.back()}
            className="mb-4 inline-flex items-center gap-2 text-sm text-rose-mauve transition-elegant hover:text-rose-light"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver</span>
          </button>
          <h1 className="text-2xl font-semibold text-cream">Agregar Nueva Modelo</h1>
          <p className="mt-1 text-sm text-gray-400">
            Completa todos los campos para agregar una nueva modelo al catálogo
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-8">
        <ModelForm />
      </div>
    </div>
  );
}
