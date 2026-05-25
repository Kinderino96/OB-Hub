import { SignJWT, jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || "cambia-questa-chiave-segreta-in-vercel"
);
const COOKIE_NAME = "dash_session";

export async function signToken(dashboardId) {
  return new SignJWT({ dashboardId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("8h")
    .sign(SECRET);
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload;
  } catch {
    return null;
  }
}

export function getCookieName(dashboardId) {
  return `${COOKIE_NAME}_${dashboardId}`;
}
