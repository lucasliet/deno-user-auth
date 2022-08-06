import { create } from 'https://deno.land/x/djwt@v2.7/mod.ts';
import moment from 'https://deno.land/x/momentjs@2.29.1-deno/mod.ts';

const ONE_HOUR = moment().add({ hours: 1 }).unix();

export const JWS_SECRET_TOKEN = await crypto.subtle.importKey('jwk',
  { kty: 'oct', k: Deno.env.get('JWS_SECRET_TOKEN') ?? 'secret' },
  { name: 'HMAC', hash: 'SHA-512' }, true, ['sign', 'verify']);

export const AUTH_PAYLOAD_KEY = 'auth_payload';

export const createUserToken = async (user: string) =>
({
  expires_in: ONE_HOUR,
  access_token: await create(
    { alg: 'HS512', typ: 'JWT' },
    { exp: ONE_HOUR, user },
    JWS_SECRET_TOKEN
  )
});