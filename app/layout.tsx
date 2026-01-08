import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Elite Models - Catálogo Exclusivo',
  description: 'Descubre nuestro catálogo exclusivo de modelos profesionales de alto nivel.',
  openGraph: {
    title: 'Elite Models - Catálogo Exclusivo',
    description: 'Descubre nuestro catálogo exclusivo de modelos profesionales de alto nivel.',
    type: 'website',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elite Models - Catálogo Exclusivo',
    description: 'Descubre nuestro catálogo exclusivo de modelos profesionales de alto nivel.',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className={inter.className}>
        {children}
        <WhatsAppButton />
        <Toaster position="bottom-center" richColors />
      </body>
    </html>
  );
}
