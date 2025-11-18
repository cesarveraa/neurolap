// lib/server/api.ts
export async function backend(path: string, init?: RequestInit) {
  const base = process.env.AUTH_BACKEND_URL!
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`
  const res = await fetch(url, {
    ...init,
    // Asegúrate de no reenviar cookies del navegador
    // salvo que tu backend las requiera. Aquí no es necesario.
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  })
  return res
}
