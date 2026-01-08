'use client';
export const dynamic = "force-dynamic";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';
import { ArrowLeft, Phone } from 'lucide-react';

interface Modelo {
  id: string;
  nombre: string;
  edad: number;
  altura: string;
  medidas: string;
  descripcion: string;
  fotos: string[];
  activo: boolean;
}

export default function CatalogoPage() {
  const [modelos, setModelos] = useState<Modelo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedModelo, setSelectedModelo] = useState<Modelo | null>(null);

  useEffect(() => {
    fetchModelos();
  }, []);

  const fetchModelos = async () => {
    try {
      const { data, error } = await supabase!
        .from('modelos')
        .select('*')
        .eq('activo', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setModelos(data || []);
    } catch (error) {
      console.error('Error fetching modelos:', error);
    } finally {
      setLoading(false);
    }
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '527223969159';

  return (
    <div className="min-h-screen bg-dark-primary">
      {/* Header */}
      <header className="border-b border-rose-mauve/20 bg-dark-secondary/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-cream hover:text-rose-mauve transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Volver</span>
          </Link>
          <h1 className="text-xl font-serif text-cream">Catálogo</h1>
          <div className="w-20" />
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-burgundy"></div>
          </div>
        ) : modelos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-cream/60 text-lg">Próximamente nuevos perfiles</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {modelos.map((modelo) => (
              <div
                key={modelo.id}
                onClick={() => setSelectedModelo(modelo)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-dark-secondary border border-rose-mauve/20 transition-all duration-300 hover:border-rose-mauve/50 hover:shadow-xl">
                  {modelo.fotos && modelo.fotos[0] ? (
                    <img
                      src={modelo.fotos[0]}
                      alt={modelo.nombre}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-dark-secondary">
                      <span className="text-cream/40">Sin foto</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-cream font-medium text-lg">{modelo.nombre}</h3>
                      <p className="text-cream/70 text-sm">{modelo.edad} años • {modelo.altura}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {selectedModelo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedModelo(null)}
        >
          <div
            className="bg-dark-secondary rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-rose-mauve/30"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedModelo.fotos && selectedModelo.fotos[0] && (
              <img
                src={selectedModelo.fotos[0]}
                alt={selectedModelo.nombre}
                className="w-full aspect-[3/4] object-cover rounded-t-xl"
              />
            )}
            <div className="p-6">
              <h2 className="text-2xl font-serif text-cream mb-2">{selectedModelo.nombre}</h2>
              <div className="flex gap-4 text-cream/70 text-sm mb-4">
                <span>{selectedModelo.edad} años</span>
                <span>{selectedModelo.altura}</span>
                {selectedModelo.medidas && <span>{selectedModelo.medidas}</span>}
              </div>
              {selectedModelo.descripcion && (
                <p className="text-cream/80 mb-6">{selectedModelo.descripcion}</p>
              )}
              <a
                href={`https://wa.me/${whatsappNumber}?text=Hola, me interesa conocer más sobre ${selectedModelo.nombre}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-burgundy hover:bg-burgundy-light text-cream px-6 py-3 rounded-lg transition-colors"
              >
                <Phone className="w-5 h-5" />
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Float Button */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 z-40"
      >
        <Phone className="w-6 h-6" />
      </a>
    </div>
  );
}
