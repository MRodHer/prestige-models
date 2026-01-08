'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/lib/hooks/useAuth';
import { ArrowLeft, Loader2 } from 'lucide-react';
import ModelForm from '@/components/ModelForm';
import type { Modelo } from '@/types';
import { toast } from 'sonner';

export default function EditarModeloPage({ params }: { params: { id: string } }) {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [modelo, setModelo] = useState<Modelo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/admin/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchModelo();
    }
  }, [user]);

  const fetchModelo = async () => {
    try {
      const { data, error } = await supabase
        .from('modelos')
        .select('*')
        .eq('id', params.id)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        toast.error('Modelo no encontrada');
        router.push('/admin/dashboard');
        return;
      }

      setModelo(data);
    } catch (error) {
      console.error('Error fetching modelo:', error);
      toast.error('Error al cargar la modelo');
      router.push('/admin/dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark-primary">
        <Loader2 className="h-8 w-8 animate-spin text-rose-mauve" />
      </div>
    );
  }

  if (!modelo) {
    return null;
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
          <h1 className="text-2xl font-semibold text-cream">Editar Modelo</h1>
          <p className="mt-1 text-sm text-gray-400">
            Actualiza la información de {modelo.nombre}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-8">
        <ModelForm modelo={modelo} />
      </div>
    </div>
  );
}
