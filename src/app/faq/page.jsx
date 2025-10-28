import Link from "next/link";

export default function FAQ() {
  const faqs = [
    {
      q: "¿Cómo funciona el alquiler de prendas?",
      a: "Elegís la prenda que te gusta, seleccionás las fechas en la que lo quieres usar y 24 horas antes, pasas a retirarlo. Para retirarlo debes dejar un monto de 'seguro' que luego de la devolución de la prenda, se le reingresa al cliente. Después de usarlo, se debe devolver el vestido en las mismas condiciones 48hrs después.",
    },
    {
      q: "¿Qué pasa si la prenda no me queda bien?",
      a: "La prenda se debe retirar 24hrs antes, ahí este te lo puedes probar, de no quedar como te gusta, se puede realizar un cambio o devolución, pero esta una vez que se entrega, no se puede cambiar.",
    },
    {
      q: "¿Cuánto tiempo puedo alquilar una prenda?",
      a: "Nuestros alquileres duran entre 2 y 30 días, Podés elegir las fechas exactas al momento de hacer tu reserva.",
    },
    {
      q: "¿Las prenda vienen limpias?",
      a: "Sí, todos las prenda son limpiados profesionalmente antes de entregar, las mismas se deben devolver en las mismas condiciones entregadas.",
    },
    {
      q: "¿Qué pasa si daño la prenda?",
      a: "Se debe abonar la totalidad del precio de la prenda.",
    },
    {
      q: "¿Puedo cancelar mi reserva?",
      a: "Sí, las cancelaciones son posibles hasta 5 días antes de retiro. Después de eso, se aplica un cargo por cancelación.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-extrabold text-center mb-10">
          Preguntas Frecuentes
        </h1>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-lg font-semibold text-fuchsia-600">{faq.q}</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">{faq.a}</p>
            </div>
          ))}
        </div>

        {/* Botón de volver */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-fuchsia-600 px-6 py-3 text-sm font-semibold text-white hover:bg-fuchsia-500 transition"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
