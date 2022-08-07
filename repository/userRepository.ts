import redis from '../config/redisConfig.ts';

const userKeyPrefix = 'user-';

interface UserData {
  id: string;
  passwordHash: string;
}

export default {
  register: async (user: string, passwordHash: string) => {
    const persistedData: UserData | null = await redis.hget(`${userKeyPrefix}${user}`, 'UserData');

    if (persistedData) throw Error('user already exists');

    const UserData = {
      id: crypto.randomUUID(),
      passwordHash
    };

    return redis.hset(`${userKeyPrefix}${user}`, { UserData });
  },

  updatePassword: async (user: string, passwordHash: string) => {
    const persistedData: UserData | null = await redis.hget(`${userKeyPrefix}${user}`, 'UserData');

    if (!persistedData) throw Error('user doesn\'t exists');

    const UserData = { ...persistedData, passwordHash };

    return redis.hset(`${userKeyPrefix}${user}`, { UserData });
  },

  login: (user: string): Promise<UserData | null> => redis.hget(`${userKeyPrefix}${user}`, 'UserData'),

  unregister: (user: string) => redis.del(`${userKeyPrefix}${user}`)
}