import Link from "next/link";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-extrabold text-center mb-10">
          Contact
        </h1>

        <div className="space-y-6 text-slate-700 dark:text-slate-300">
          <p className="text-center text-base">
            ¿Tenés alguna pregunta o necesitás ayuda? Estamos acá para ayudarte.
            Completá el formulario y nos pondremos en contacto lo antes posible.
          </p>

          <form className="space-y-6 mt-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Nombre completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-fuchsia-500"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-fuchsia-500"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Asunto
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-fuchsia-500"
                placeholder="¿Sobre qué quieres consultar?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-fuchsia-500 resize-none"
                placeholder="Escribe tu mensaje aquí..."
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-fuchsia-600 px-6 py-3 text-sm font-semibold text-white hover:bg-fuchsia-500 transition"
            >
              Enviar mensaje
            </button>
          </form>

          <div className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-fuchsia-600 mb-4">
              Información de contacto
            </h2>
            <div className="space-y-3 text-sm">
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:contacto@glamrent.com"
                  className="text-fuchsia-600 hover:underline"
                >
                  contacto@glamrent.com
                </a>
              </p>
              <p>
                <strong>Horario de atención:</strong> Lunes a Viernes, 9:00 - 18:00
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                Nuestro equipo responderá tu consulta en un plazo máximo de 24
                horas hábiles.
              </p>
            </div>
          </div>
        </div>

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

