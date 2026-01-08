'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/lib/hooks/useAuth';
import { Plus, LogOut, Loader2, Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import type { Modelo } from '@/types';
import { toast } from 'sonner';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [modelos, setModelos] = useState<Modelo[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/admin/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchModelos();
    }
  }, [user]);

  const fetchModelos = async () => {
    try {
      const { data, error } = await supabase
        .from('modelos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setModelos(data || []);
    } catch (error) {
      console.error('Error fetching modelos:', error);
      toast.error('Error al cargar los modelos');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta modelo?')) return;

    setDeleting(id);
    try {
      const { error } = await supabase.from('modelos').delete().eq('id', id);

      if (error) throw error;

      setModelos((prev) => prev.filter((m) => m.id !== id));
      toast.success('Modelo eliminada correctamente');
    } catch (error) {
      console.error('Error deleting modelo:', error);
      toast.error('Error al eliminar la modelo');
    } finally {
      setDeleting(null);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark-primary">
        <Loader2 className="h-8 w-8 animate-spin text-rose-mauve" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-primary">
      <header className="border-b border-dark-tertiary bg-dark-secondary">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-cream">Gestión de Modelos</h1>
              <p className="mt-1 text-sm text-gray-400">
                {modelos.length} {modelos.length === 1 ? 'modelo' : 'modelos'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg border border-rose-mauve/30 bg-transparent px-4 py-2 text-sm text-rose-mauve transition-elegant hover:border-rose-mauve hover:bg-rose-mauve/10"
            >
              <LogOut className="h-4 w-4" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <button
          onClick={() => router.push('/admin/dashboard/nuevo')}
          className="mb-8 flex items-center gap-2 rounded-lg bg-burgundy px-6 py-3 font-medium text-cream shadow-elegant transition-elegant hover:bg-burgundy-light hover:shadow-2xl hover:scale-105"
        >
          <Plus className="h-5 w-5" />
          <span>Agregar Nueva Modelo</span>
        </button>

        {loading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-rose-mauve" />
          </div>
        ) : modelos.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dark-tertiary bg-dark-secondary p-12 text-center">
            <p className="text-lg text-gray-400">No hay modelos registradas</p>
            <p className="mt-2 text-sm text-gray-500">Comienza agregando tu primera modelo</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {modelos.map((modelo) => (
              <div
                key={modelo.id}
                className="group relative overflow-hidden rounded-lg border border-dark-tertiary bg-dark-secondary transition-elegant hover:border-rose-mauve/30"
              >
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-dark-primary">
                  <Image
                    src={modelo.foto_principal}
                    alt={modelo.nombre}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-cream">{modelo.nombre}</h3>
                  <p className="mt-1 text-sm text-gray-400">
                    {modelo.edad} años • {modelo.nacionalidad}
                  </p>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => router.push(`/admin/dashboard/editar/${modelo.id}`)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-rose-mauve/30 bg-transparent px-3 py-2 text-sm text-rose-mauve transition-elegant hover:border-rose-mauve hover:bg-rose-mauve/10"
                    >
                      <Pencil className="h-4 w-4" />
                      <span>Editar</span>
                    </button>

                    <button
                      onClick={() => handleDelete(modelo.id)}
                      disabled={deleting === modelo.id}
                      className="flex items-center justify-center rounded-lg border border-red-500/30 bg-transparent px-3 py-2 text-sm text-red-400 transition-elegant hover:border-red-500 hover:bg-red-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deleting === modelo.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
