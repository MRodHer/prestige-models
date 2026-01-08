'use client';

import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '1234567890';
  const message = encodeURIComponent('Hola, me gustaría obtener más información.');

  const handleClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elegant transition-elegant hover:scale-110 hover:shadow-2xl animate-pulse-slow"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </button>
  );
}
