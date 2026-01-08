'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Modelo } from '@/types';

interface ModelCardProps {
  modelo: Modelo;
  onClick: () => void;
}

export default function ModelCard({ modelo, onClick }: ModelCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-lg transition-elegant"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-dark-secondary">
        <Image
          src={modelo.foto_principal}
          alt={modelo.nombre}
          fill
          className="object-cover transition-elegant group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-elegant ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div
          className={`absolute inset-0 flex items-center justify-center transition-elegant ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="backdrop-elegant rounded-lg bg-black/30 px-6 py-3">
            <h3 className="text-xl font-semibold text-cream">{modelo.nombre}</h3>
          </div>
        </div>

        <div
          className={`absolute inset-0 border-2 transition-elegant ${
            isHovered ? 'border-rose-mauve' : 'border-transparent'
          }`}
        />
      </div>
    </div>
  );
}
