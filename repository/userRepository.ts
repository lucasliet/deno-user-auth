import { Redis } from "https://deno.land/x/upstash_redis@v1.11.0/mod.ts";

const redis = new Redis({
  url: Deno.env.get('UPSTASH_REDIS_REST_URL') ?? '',
  token: Deno.env.get('UPSTASH_REDIS_REST_TOKEN') ?? '',
})

interface UserData {
  passwordHash: string,
}

export default {
  register: async (user: string, passwordHash: string) => {
    const persistedPassHash: UserData | null = await redis.get(user);

    if (persistedPassHash) throw Error('user already exists');

    return await redis.hset(user, { passwordHash });
  },

  login: async (user: string, passwordHash: string) => {
    const persistedPassHash: UserData | null = await redis.get(user);

    return persistedPassHash?.passwordHash === passwordHash ? true : false;
  }
}