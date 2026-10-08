import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/*
 * Dashboard access: one account, defined by ADMIN_EMAIL and ADMIN_PASSWORD on the server.
 * The session is a stateless HMAC-signed cookie (AUTH_SECRET). It carries a fingerprint of
 * the password, so changing ADMIN_PASSWORD signs everyone out.
 */

const COOKIE = "dacnis_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

type Payload = { sub: string; ver: string; exp: number };

function settings() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.AUTH_SECRET;
  if (!email || !password || !secret || secret.length < 32) return null;
  return { email, password, secret };
}

/** false when the server is missing ADMIN_EMAIL, ADMIN_PASSWORD or AUTH_SECRET. */
export const authConfigured = () => settings() !== null;

const sha256 = (value: string) => createHash("sha256").update(value).digest();
const fingerprint = (password: string) => sha256(`dacnis:${password}`).toString("base64url").slice(0, 16);
const sign = (data: string, secret: string) => createHmac("sha256", secret).update(data).digest("base64url");

/** Compares hashes of equal length, so the check takes the same time whatever the input. */
const same = (a: string, b: string) => timingSafeEqual(sha256(a), sha256(b));

export function checkCredentials(email: string, password: string) {
  const s = settings();
  if (!s) return false;
  const emailOk = same(email.trim().toLowerCase(), s.email);
  const passwordOk = same(password, s.password);
  return emailOk && passwordOk;
}

export async function startSession() {
  const s = settings();
  if (!s) return;
  const payload: Payload = { sub: s.email, ver: fingerprint(s.password), exp: Math.floor(Date.now() / 1000) + MAX_AGE };
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  (await cookies()).set(COOKIE, `${data}.${sign(data, s.secret)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/dashboard",
    maxAge: MAX_AGE,
  });
}

export async function endSession() {
  (await cookies()).set(COOKIE, "", { path: "/dashboard", maxAge: 0 });
}

export async function isSignedIn() {
  const s = settings();
  const token = (await cookies()).get(COOKIE)?.value;
  if (!s || !token) return false;
  const [data, signature] = token.split(".");
  if (!data || !signature) return false;
  const expected = Buffer.from(sign(data, s.secret));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return false;
  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString()) as Payload;
    return payload.sub === s.email && payload.ver === fingerprint(s.password) && payload.exp > Date.now() / 1000;
  } catch {
    return false;
  }
}

/** Call at the top of every dashboard page, Server Action and route handler. */
export async function requireAdmin() {
  if (!(await isSignedIn())) redirect("/dashboard/login");
}
