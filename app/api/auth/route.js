import { dashboards } from "../../../lib/dashboards";
import { signToken, getCookieName } from "../../../lib/auth";

export async function POST(request) {
  const { dashboardId, password } = await request.json();

  const dashboard = dashboards.find((d) => d.id === dashboardId);
  if (!dashboard) {
    return Response.json({ error: "Dashboard non trovata" }, { status: 404 });
  }

  if (password !== dashboard.password) {
    return Response.json({ error: "Password errata" }, { status: 401 });
  }

  const token = await signToken(dashboardId);
  const cookieName = getCookieName(dashboardId);

  const response = Response.json({ ok: true });
  response.headers.set(
    "Set-Cookie",
    `${cookieName}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=28800`
  );
  return response;
}
