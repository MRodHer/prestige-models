import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-dark px-6 py-24 sm:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(183,110,121,0.08)_0%,_transparent_65%)]" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-rose-mauve/20 bg-dark-secondary/50 px-4 py-2 text-sm text-rose-light backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            <span>Catálogo Exclusivo</span>
          </div>

          <h1 className="mb-6 text-5xl font-light tracking-tight text-cream sm:text-6xl lg:text-7xl">
            Elegancia
            <span className="block font-semibold bg-gradient-to-r from-rose-mauve via-rose-light to-burgundy bg-clip-text text-transparent">
              Redefinida
            </span>
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-lg font-light leading-relaxed text-gray-400 sm:text-xl">
            Descubre nuestro selecto catálogo de modelos profesionales.
            <span className="block mt-2">
              Refinamiento, exclusividad y distinción en cada perfil.
            </span>
          </p>

          <div className="flex justify-center">
            <Link
              href="/catalogo"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-burgundy px-8 py-4 text-base font-medium text-cream shadow-elegant transition-elegant hover:bg-burgundy-light hover:shadow-2xl hover:scale-105"
            >
              <span className="relative z-10">Explorar Catálogo</span>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-burgundy-dark to-burgundy opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-mauve/20 to-transparent" />
      </div>

      <section className="border-t border-dark-tertiary bg-dark-secondary px-6 py-16 sm:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-burgundy/10 text-burgundy">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-cream">Calidad Premium</h3>
              <p className="text-sm leading-relaxed text-gray-400">
                Modelos seleccionadas con los más altos estándares profesionales
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-burgundy/10 text-burgundy">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-cream">Atención Exclusiva</h3>
              <p className="text-sm leading-relaxed text-gray-400">
                Servicio personalizado para cada proyecto y necesidad específica
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-burgundy/10 text-burgundy">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-cream">Experiencia Garantizada</h3>
              <p className="text-sm leading-relaxed text-gray-400">
                Años de trayectoria respaldando cada colaboración exitosa
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-dark-tertiary bg-dark-primary px-6 py-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Elite Models. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}
