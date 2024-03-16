import { compressObject, decompressObject } from "https://deno.land/x/textcompress@v1.0.0/mod.ts";

interface UserData {
  id: string;
  passwordHash: string;
}

const userKeyPrefix = 'deno-auth-user';
const kv = await Deno.openKv();

export default {
  register: async (user: string, passwordHash: string) => {
    const persistedData: string = (await kv.get<string>([userKeyPrefix, user])).value;

    if (persistedData) throw Error('user already exists');

    const userData = {
      id: crypto.randomUUID(),
      passwordHash
    };

    const compressedUserData: string = compressObject(userData);

    return (await kv.set([userKeyPrefix, user], compressedUserData)).ok;
  },

  updatePassword: async (user: string, passwordHash: string) => {
    const compressedUserData = (await kv.get<string>([userKeyPrefix, user])).value;

    if (!compressedUserData) throw Error('user doesn\'t exists');

    const persistedData = decompressObject<UserData>(compressedUserData);

    const userData = { ...persistedData, passwordHash };

    const updatedCompressedUserData: string = compressObject(userData);

    return (await kv.set([userKeyPrefix, user], updatedCompressedUserData)).ok;
  },

  login: async (user: string): Promise<UserData | null> => {
    const compressedData = (await kv.get<string>([userKeyPrefix, user])).value;

    if (!compressedData) return null;

    return decompressObject<UserData>(compressedData);
  },

  unregister: async (user: string) => await kv.delete([userKeyPrefix, user])
}