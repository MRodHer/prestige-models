'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, User, Globe, Ruler, MessageCircle } from 'lucide-react';
import type { Modelo } from '@/types';

interface ModelModalProps {
  modelo: Modelo;
  onClose: () => void;
}

export default function ModelModal({ modelo, onClose }: ModelModalProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '1234567890';

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % modelo.fotos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + modelo.fotos.length) % modelo.fotos.length);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hola, me gustaría obtener más información sobre ${modelo.nombre}.`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative h-full w-full max-w-7xl overflow-hidden rounded-lg bg-dark-secondary shadow-elegant"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full bg-black/50 p-2 text-rose-mauve backdrop-blur-sm transition-elegant hover:bg-black/70 hover:text-rose-light"
          aria-label="Cerrar"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex h-full flex-col lg:flex-row">
          <div className="relative flex-1 bg-black">
            <div className="relative h-full min-h-[400px] lg:min-h-full">
              <Image
                src={modelo.fotos[currentPhotoIndex]}
                alt={`${modelo.nombre} - Foto ${currentPhotoIndex + 1}`}
                fill
                className="object-contain"
                priority
              />

              {modelo.fotos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-rose-mauve backdrop-blur-sm transition-elegant hover:bg-black/70 hover:text-rose-light"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>

                  <button
                    onClick={nextPhoto}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-rose-mauve backdrop-blur-sm transition-elegant hover:bg-black/70 hover:text-rose-light"
                    aria-label="Foto siguiente"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>

                  <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                    {modelo.fotos.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPhotoIndex(index)}
                        className={`h-2 w-2 rounded-full transition-elegant ${
                          index === currentPhotoIndex
                            ? 'bg-burgundy w-8'
                            : 'bg-rose-mauve/40 hover:bg-rose-mauve/60'
                        }`}
                        aria-label={`Ver foto ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex w-full flex-col overflow-y-auto bg-dark-secondary p-8 lg:w-96 lg:p-10">
            <div className="flex-1 space-y-8">
              <div>
                <h2 className="text-3xl font-semibold text-cream">{modelo.nombre}</h2>
                <div className="mt-1 h-1 w-16 rounded-full bg-gradient-to-r from-burgundy to-rose-mauve" />
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-burgundy/10 text-rose-mauve">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      Edad
                    </p>
                    <p className="mt-1 text-lg text-cream">{modelo.edad} años</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-burgundy/10 text-rose-mauve">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      Nacionalidad
                    </p>
                    <p className="mt-1 text-lg text-cream">{modelo.nacionalidad}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-burgundy/10 text-rose-mauve">
                    <Ruler className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      Altura
                    </p>
                    <p className="mt-1 text-lg text-cream">{modelo.altura} cm</p>
                  </div>
                </div>

                <div className="rounded-lg border border-rose-mauve/10 bg-dark-primary/50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Medidas
                  </p>
                  <p className="mt-2 text-2xl font-light text-cream">
                    {modelo.busto} - {modelo.cintura} - {modelo.cadera}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">Busto - Cintura - Cadera (cm)</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleWhatsApp}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-4 font-medium text-white shadow-elegant transition-elegant hover:bg-[#20bd5a] hover:shadow-2xl hover:scale-105"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Contactar por WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
