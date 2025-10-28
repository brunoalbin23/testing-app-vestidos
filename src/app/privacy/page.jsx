import Link from "next/link";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-extrabold text-center mb-10">
          Política de Privacidad
        </h1>

        <div className="space-y-6 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          <p>
            En <strong>GlamRent</strong> valoramos tu privacidad y nos
            comprometemos a proteger tu información personal. Esta política
            explica cómo recopilamos, usamos y protegemos tus datos.
          </p>

          <h2 className="text-lg font-semibold text-fuchsia-600">
            Información que recopilamos
          </h2>
          <p>
            Podemos recopilar tu nombre, correo electrónico, dirección y datos
            de pago cuando realizás una reserva o te suscribís a nuestro boletín.
          </p>

          <h2 className="text-lg font-semibold text-fuchsia-600">
            Uso de la información
          </h2>
          <p>
            Utilizamos tus datos para procesar pedidos, mejorar nuestros
            servicios y enviarte actualizaciones o promociones relacionadas con
            GlamRent.
          </p>

          <h2 className="text-lg font-semibold text-fuchsia-600">
            Protección de datos
          </h2>
          <p>
            Tomamos medidas técnicas y organizativas para mantener segura tu
            información y evitar accesos no autorizados.
          </p>

          <h2 className="text-lg font-semibold text-fuchsia-600">
            Cookies
          </h2>
          <p>
            Este sitio utiliza cookies para mejorar tu experiencia de navegación.
            Podés desactivarlas desde la configuración de tu navegador.
          </p>

          <h2 className="text-lg font-semibold text-fuchsia-600">
            Contacto
          </h2>
          <p>
            Si tenés preguntas sobre nuestra política de privacidad, podés
            contactarnos en{" "}
            <Link
              href="/contact"
              className="text-fuchsia-600 hover:underline"
            >
              la página de contacto
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
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
