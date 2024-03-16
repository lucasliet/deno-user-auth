const userKeyPrefix = 'deno-auth-user';
interface UserData {
  id: string;
  passwordHash: string;
}

const kv = await Deno.openKv();

export default {
  register: async (user: string, passwordHash: string) => {
    const persistedData: UserData = await kv.get<UserData>([userKeyPrefix, user]).value;

    if (persistedData) throw Error('user already exists');

    const userData = {
      id: crypto.randomUUID(),
      passwordHash
    };

    return await kv.set([userKeyPrefix, user], userData).ok;
  },

  updatePassword: async (user: string, passwordHash: string) => {
    const persistedData: UserData = await kv.get<UserData>([userKeyPrefix, user]).value;

    if (!persistedData) throw Error('user doesn\'t exists');

    const userData = { ...persistedData, passwordHash };

    return await kv.set([userKeyPrefix, user], userData).ok;
  },

  login: async (user: string): Promise<UserData | null> => await kv.get<UserData>([userKeyPrefix, user]).value,

  unregister: async (user: string) => await kv.delete([userKeyPrefix, user])
}