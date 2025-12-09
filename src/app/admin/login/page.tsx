export default async function AdminLogin() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-bold">Iniciar sesión administrador</h1>
      <form action="/api/admin/login" method="POST" className="mt-6 grid gap-3 rounded-2xl border p-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-1">Usuario</label>
          <input id="username" name="username" placeholder="Usuario" defaultValue="admin" className="rounded-xl border px-4 py-3 text-sm w-full" />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">Contraseña</label>
          <input id="password" name="password" type="password" placeholder="Contraseña" defaultValue="admin123" className="rounded-xl border px-4 py-3 text-sm w-full" />
        </div>
        <button className="rounded-xl bg-fuchsia-600 text-white px-4 py-3 text-sm font-semibold">Iniciar sesión</button>
        <p className="text-xs text-slate-500">Área protegida. Solo personal autorizado.</p>
      </form>
    </div>
  );
}