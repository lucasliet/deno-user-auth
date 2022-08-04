import redis from '../config/redisConfig.ts';

export default {
  register: async (user: string, passwordHash: string) => {
    const persistedPassHash: string | null = await redis.hget(user, 'passwordHash');

    if (persistedPassHash) throw Error('user already exists');

    return redis.hset(user, { passwordHash });
  },
  login: (user: string): Promise<string | null> => redis.hget(user, 'passwordHash'),
  unregister: (user: string) => redis.del(user)
}