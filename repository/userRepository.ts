import redis from '../config/redisConfig.ts';

const userKeyPrefix = 'user-';

export default {
  register: async (user: string, passwordHash: string) => {
    const persistedPassHash: string | null = await redis.hget(`${userKeyPrefix}${user}`, 'passwordHash');

    if (persistedPassHash) throw Error('user already exists');

    return redis.hset(`${userKeyPrefix}${user}`, { passwordHash });
  },
  updatePassword: async (user: string, passwordHash: string) => {
    const persistedPassHash: string | null = await redis.hget(`${userKeyPrefix}${user}`, 'passwordHash');

    if (!persistedPassHash) throw Error('user doesn\'t exists');

    return redis.hset(`${userKeyPrefix}${user}`, { passwordHash });
  },
  login: (user: string): Promise<string | null> => redis.hget(`${userKeyPrefix}${user}`, 'passwordHash'),
  unregister: (user: string) => redis.del(`${userKeyPrefix}${user}`)
}