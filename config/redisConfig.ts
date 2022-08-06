import { Redis } from 'https://deno.land/x/upstash_redis@v1.11.0/mod.ts';

const redis = new Redis({
  url: Deno.env.get('UPSTASH_REDIS_REST_URL') ?? '',
  token: Deno.env.get('UPSTASH_REDIS_REST_TOKEN') ?? '',
});

export default redis;