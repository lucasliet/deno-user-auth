import redis from '../config/redisConfig.ts';

interface UserData {
  passwordHash: string,
}

export default {
  register: async (user: string, passwordHash: string) => {
    const persistedPassHash: UserData | null = await redis.get(user);

    if (persistedPassHash) throw Error('user already exists');

    return redis.hset(user, { passwordHash });
  },
  login: (user: string): Promise<UserData | null> => redis.get(user)
}