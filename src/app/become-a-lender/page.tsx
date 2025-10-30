import Link from "next/link";

export default function BecomeALender() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-extrabold text-center mb-10">
          Become a Lender
        </h1>

        <div className="space-y-6 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          <p>
            ¿Tenés vestidos o accesorios de diseñador que querés rentar? En{" "}
            <strong>GlamRent</strong> te ayudamos a monetizar tu guardarropa y
            darle una segunda vida a tus prendas favoritas.
          </p>

          <h2 className="text-lg font-semibold text-fuchsia-600">
            ¿Por qué ser lender?
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>Ganá dinero rentando tus prendas que no usás frecuentemente</li>
            <li>
              Ayudá a que más personas disfruten de diseños exclusivos sin comprar
            </li>
            <li>
              Mantenemos y limpiamos tus prendas profesionalmente después de cada
              alquiler
            </li>
            <li>Proceso simple y seguro con seguimiento completo</li>
          </ul>

          <h2 className="text-lg font-semibold text-fuchsia-600">
            Requisitos
          </h2>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>Prendas en excelente estado</li>
            <li>Marcas de diseñador reconocidas</li>
            <li>Documentación de autenticidad cuando corresponda</li>
            <li>Disponibilidad para coordinación de retiros y devoluciones</li>
          </ul>

          <h2 className="text-lg font-semibold text-fuchsia-600">
            Cómo funciona
          </h2>
          <p>
            Contactanos con información sobre tus prendas. Nuestro equipo las
            evaluará y, si cumplen los criterios, las agregaremos a nuestro
            catálogo. Te pagaremos un porcentaje de cada alquiler realizado.
          </p>

          <h2 className="text-lg font-semibold text-fuchsia-600">
            Contacto
          </h2>
          <p>
            Para más información sobre cómo convertirte en lender,{" "}
            <Link href="/contact" className="text-fuchsia-600 hover:underline">
              contactanos
            </Link>
            .
          </p>
        </div>

        {/* Botón de volver */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-fuchsia-600 px-6 py-3 text-sm font-semibold text-white hover:bg-fuchsia-500 transition"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

