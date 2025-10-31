import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

export default function Home() {
  const featured = [
    { id: 1, name: "Silk Evening Gown", price: 79, image: "/images/dresses/silk-evening-gown.jpg", alt: "Model wearing a champagne silk evening gown" },
    { id: 2, name: "Black Tie Dress", price: 99, image: "/images/dresses/black-tie-dress.jpg", alt: "Elegant black tie dress" },
    { id: 3, name: "Floral Midi Dress", price: 49, image: `/images/dresses/floral-midi-dress.jpg`, alt: "Floral midi dress perfect for daytime events" },
    { id: 4, name: "Velvet Cocktail Dress", price: 59, image: "/images/dresses/velvet-cocktail-dress.jpg", alt: "Velvet cocktail dress in deep tones" },
  ];

  const steps = [
    { 
      emoji: "🧭", 
      title: "Browse", 
      shortText: "Find styles by size, color, designer, or occasion.",
      detailedText: "Explorá nuestro catálogo completo de vestidos y accesorios de diseñador. Filtrá por tamaño, color, estilo u ocasión para encontrar la prenda perfecta. Cada item muestra imágenes, descripción completa, disponibilidad y precio por día.",
      details: [
        "Busca por estilo, color o diseñador",
        "Filtra por talla y ocasión",
        "Revisa disponibilidad en el calendario",
        "Consulta precios y detalles de cada prenda"
      ]
    },
    { 
      emoji: "📦", 
      title: "Rent", 
      shortText: "Pick dates and get it delivered to your door.",
      detailedText: "Seleccioná las fechas exactas en las que necesitás la prenda (de 2 a 30 días). Completá tu información de contacto y realizá la reserva. 24 horas antes de tu evento, retirá la prenda en nuestro local. Se requiere dejar un depósito de seguro que se reembolsa al devolver la prenda en buen estado.",
      details: [
        "Selecciona fechas de alquiler (2-30 días)",
        "Completa tus datos de contacto",
        "Recibe confirmación por email",
        "Retira 24 horas antes del evento con depósito de seguro"
      ]
    },
    { 
      emoji: "✨", 
      title: "Return", 
      shortText: "Wear, wow, and send it back—cleaning included.",
      detailedText: "Disfrutá tu evento luciendo increíble. Devuelve la prenda en perfectas condiciones dentro de las 48 horas posteriores al evento. Todas nuestras prendas son limpiadas profesionalmente antes de cada alquiler y deben devolverse en el mismo estado. Una vez verificado, recibirás el reembolso de tu depósito.",
      details: [
        "Disfruta tu evento luciendo perfecta",
        "Devuelve en 48 horas después del evento",
        "Prenda debe estar en las mismas condiciones",
        "Recibe reembolso del depósito automáticamente"
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900 dark:from-slate-950 dark:to-slate-900 dark:text-slate-100">
      <main>
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
                Rent designer dresses for every
                <span className="mx-2 bg-gradient-to-r from-fuchsia-600 via-rose-500 to-orange-400 bg-clip-text text-transparent">occasion</span>.
              </h1>
              <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300">
                Look stunning without the price tag. Flexible rentals, free cleaning, and fast delivery.
              </p>

              <form action="/search" method="GET" className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-4 shadow-sm">
                <div className="col-span-1 lg:col-span-2">
                  <label htmlFor="query" className="sr-only">Search</label>
                  <input
                    id="query"
                    name="q"
                    type="text"
                    placeholder="Search by style, color, or designer"
                    className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-fuchsia-500"
                  />
                </div>
                <div>
                  <label htmlFor="start" className="sr-only">Start date</label>
                  <input
                    id="start"
                    name="start"
                    type="date"
                    className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-fuchsia-500"
                  />
                </div>
                <div>
                  <label htmlFor="end" className="sr-only">End date</label>
                  <input
                    id="end"
                    name="end"
                    type="date"
                    className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-fuchsia-500"
                  />
                </div>
                <div>
                  <label htmlFor="size" className="sr-only">Size</label>
                  <select
                    id="size"
                    name="size"
                    className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-fuchsia-500"
                  >
                    <option value="">Any size</option>
                    <option>XS</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                  </select>
                </div>
                <div className="lg:col-span-5">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-fuchsia-600 px-6 py-3 text-sm font-semibold text-white hover:bg-fuchsia-500"
                  >
                    Search dresses
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section id="featured" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold">Featured picks</h2>
            <Link href="/search" className="text-sm text-fuchsia-600 hover:underline">Browse all →</Link>
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-[3/4] relative bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                    priority={item.id === 1}
                  />
                  <div className="absolute bottom-3 left-3">
                    <span className="inline-flex items-center rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-slate-800 dark:text-slate-100 shadow-sm">
                      From ${item.price}/day
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-medium">{item.name}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Free cleaning • 2–7 day rentals</p>
                  <div className="mt-4">
                    <Link
                      href={`/items/${item.id}`}
                      className="inline-flex items-center rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      View details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="how" className="bg-slate-50/70 dark:bg-slate-900/60 border-y border-slate-200/60 dark:border-slate-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="text-center mb-4">
              <h2 className="text-2xl sm:text-3xl font-bold">How it works</h2>
              <p className="mt-4 text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Alquilar vestidos de diseñador nunca fue tan fácil. Seguí estos simples pasos para lucir increíble en tu próximo evento.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {steps.map((s, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col items-center text-center">
                    <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-fuchsia-500/20 to-rose-500/20 flex items-center justify-center text-3xl mb-6 shadow-sm">
                      {s.emoji}
                    </div>
                    <div className="flex items-center justify-center mb-2">
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-fuchsia-600 text-white text-sm font-bold mr-3">
                        {i + 1}
                      </span>
                      <h3 className="text-xl font-bold">{s.title}</h3>
                    </div>
                    <p className="mt-4 text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                      {s.detailedText}
                    </p>
                    <div className="mt-6 w-full">
                      <ul className="text-left space-y-3">
                        {s.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start text-sm text-slate-600 dark:text-slate-400">
                            <span className="inline-flex items-center justify-center flex-shrink-0 h-5 w-5 rounded-full bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-600 dark:text-fuchsia-400 text-xs font-semibold mr-3 mt-0.5">
                              ✓
                            </span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 rounded-2xl border border-fuchsia-200 dark:border-fuchsia-800 bg-gradient-to-br from-fuchsia-50 to-rose-50 dark:from-fuchsia-900/20 dark:to-rose-900/20 p-6 sm:p-8">
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
                  💡 Información importante
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-700 dark:text-slate-300 text-left">
                  <div className="flex items-start">
                    <span className="text-fuchsia-600 dark:text-fuchsia-400 mr-2 font-semibold">•</span>
                    <span>Podés cancelar hasta 5 días antes del retiro sin cargo</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-fuchsia-600 dark:text-fuchsia-400 mr-2 font-semibold">•</span>
                    <span>Probar la prenda al retirar (24h antes) te permite cambiar si no te queda</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-fuchsia-600 dark:text-fuchsia-400 mr-2 font-semibold">•</span>
                    <span>Todas las prendas se limpian profesionalmente antes de cada alquiler</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-fuchsia-600 dark:text-fuchsia-400 mr-2 font-semibold">•</span>
                    <span>El depósito de seguro se reembolsa automáticamente tras la devolución</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2">
              <h2 className="text-2xl sm:text-3xl font-bold">Join our newsletter</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">Get style tips, drops, and exclusive offers.</p>
            </div>
            <NewsletterForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-sm text-slate-600 dark:text-slate-400">© {new Date().getFullYear()} GlamRent. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <Link href="/terms" className="hover:text-fuchsia-600">Terms</Link>
            <Link href="/privacy" className="hover:text-fuchsia-600">Privacy</Link>
            <Link href="/contact" className="hover:text-fuchsia-600">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
