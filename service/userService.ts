import userRepository from '../repository/userRepository.ts';
import { hash, verify } from "https://deno.land/x/scrypt@v4.0.0/mod.ts";

export default {
  register: async (user: string, password: string) => {
    const passwordHash = hash(password);
    await userRepository.register(user, passwordHash);
    return { message: `user ${user} registered sucessfully` };
  },
  login: async (user: string, password: string) => {
    const persistedUser = await userRepository.login(user);
    return verify(password, persistedUser?.passwordHash ?? '');
  }
}