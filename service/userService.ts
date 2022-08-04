import userRepository from '../repository/userRepository.ts';
import { hash, verify } from "https://deno.land/x/scrypt@v4.0.0/mod.ts";

export default {
  register: async (user: string, password: string) => {
    const passwordHash = hash(password);
    return await userRepository.register(user, passwordHash);
  },
  login: async (user: string, password: string) => {
    const passwordHash = await userRepository.login(user);
    return verify(password, passwordHash ?? '');
  },
  async unregister(user: string, password: string) {
    if(await this.login(user, password)) {
      return userRepository.unregister(user);
    } else {
      return false;
    }
  }
}