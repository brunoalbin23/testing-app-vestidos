import Link from "next/link";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-extrabold text-center mb-10">
          Términos y Condiciones
        </h1>

        <div className="space-y-6 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          <p>
            Bienvenido a <strong>GlamRent</strong>. Al acceder o utilizar nuestro
            sitio web, aceptás cumplir con los siguientes términos y condiciones
            de uso.
          </p>

          <h2 className="text-lg font-semibold text-fuchsia-600">
            Uso del servicio
          </h2>
          <p>
            GlamRent ofrece un servicio de alquiler de vestidos por tiempo
            limitado. Los usuarios deben proporcionar información veraz y
            completa al realizar una reserva.
          </p>

          <h2 className="text-lg font-semibold text-fuchsia-600">
            Reservas y pagos
          </h2>
          <p>
            Al confirmar una reserva, aceptás los cargos aplicables. Todos los
            pagos se procesan de forma segura mediante nuestros proveedores de
            pago autorizados.
          </p>

          <h2 className="text-lg font-semibold text-fuchsia-600">
            Responsabilidad del usuario
          </h2>
          <p>
            El usuario es responsable del cuidado del vestido durante el período
            de alquiler. En caso de pérdida o daño grave, podrá aplicarse un
            cargo adicional.
          </p>

          <h2 className="text-lg font-semibold text-fuchsia-600">
            Cancelaciones
          </h2>
          <p>
            Las cancelaciones con al menos 5 días de anticipación reciben un
            reembolso completo. Cancelaciones posteriores pueden estar sujetas a
            cargos.
          </p>

          <h2 className="text-lg font-semibold text-fuchsia-600">
            Propiedad intelectual
          </h2>
          <p>
            Todo el contenido del sitio, incluidos textos, imágenes y logotipos,
            es propiedad de GlamRent y no puede ser utilizado sin autorización
            previa.
          </p>

          <h2 className="text-lg font-semibold text-fuchsia-600">
            Modificaciones
          </h2>
          <p>
            Nos reservamos el derecho de modificar estos términos en cualquier
            momento. Las actualizaciones se publicarán en esta página.
          </p>

          <h2 className="text-lg font-semibold text-fuchsia-600">
            Contacto
          </h2>
          <p>
            Para consultas sobre estos términos, podés comunicarte a través de{" "}
            <Link href="/contact" className="text-fuchsia-600 hover:underline">
              nuestra página de contacto
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
