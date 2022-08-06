import userRepository from '../repository/userRepository.ts';
import { hash, verify } from "https://deno.land/x/scrypt@v4.0.0/mod.ts";

export default {
  register: async (user: string, password: string) => {
    const passwordHash = hash(password);
    return await userRepository.register(user, passwordHash);
  },
  
  updatePassword: async (user: string, password: string) => {
    const passwordHash = hash(password);
    await userRepository.updatePassword(user, passwordHash);
    return true;
  },
  
  login: async (user: string, password: string) => {
    const passwordHash = await userRepository.login(user);
    return passwordHash ? verify(password, passwordHash) : false;
  },
  
  unregister: (user: string) =>
    userRepository.unregister(user)
}