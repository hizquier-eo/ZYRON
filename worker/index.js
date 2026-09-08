const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
});

const sha256 = async (value) => {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/diplomas/access" && request.method === "POST") {
      const body = await request.json().catch(() => ({}));
      const hash = await sha256(String(body.accessCode || ""));
      const row = await env.DB.prepare(
        "SELECT public_id, diploma_path FROM diplomas WHERE access_code_hash = ?1 AND status = 'VÁLIDO' LIMIT 1"
      ).bind(hash).first();
      if (!row) return json({ error: "Código no válido" }, 401);
      return json({ diplomaUrl: new URL(row.diploma_path, url.origin).href, publicId: row.public_id });
    }
    const match = url.pathname.match(/^\/validar\/([A-Za-z0-9_-]{16,64})$/);
    if (match && request.method === "GET") {
      const row = await env.DB.prepare(
        "SELECT public_id, number, holder, course, issue_date, status, verification_code, diploma_path FROM diplomas WHERE public_id = ?1 LIMIT 1"
      ).bind(match[1]).first();
      if (!row) return new Response("Registro no encontrado", { status: 404 });
      return new Response(`<!doctype html><meta charset="utf-8"><title>Validación ZYRON ${row.number}</title><main><h1>Diploma válido</h1><p><b>Titular:</b> ${row.holder}</p><p><b>Curso:</b> ${row.course}</p><p><b>Número:</b> ${row.number}</p><p><b>Fecha:</b> ${row.issue_date}</p><p><b>Estado:</b> ${row.status}</p><p><b>Código verificable:</b> ${row.verification_code}</p><p><a href="${row.diploma_path}">Descargar diploma PDF</a></p></main>`, { headers: { "content-type": "text/html; charset=utf-8", "x-content-type-options": "nosniff" } });
    }
    return new Response("Not found", { status: 404 });
  }
};
