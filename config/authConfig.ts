import { create, getNumericDate } from "https://deno.land/x/djwt@v2.7/mod.ts";

const ONE_DAY = getNumericDate(3600 * 24)

const key = await crypto.subtle.importKey('jwk',
  { kty: 'oct', k: Deno.env.get('JWS_SECRET_TOKEN') ?? 'secret' },
  { name: "HMAC", hash: "SHA-512" }, true, ["sign", "verify"]);

export const createUserToken = (user: string) =>
  create({ alg: "HS512", typ: "JWT" }, { exp: ONE_DAY, user }, key)

export default key;