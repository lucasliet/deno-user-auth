import userRepository from '../repository/userRepository.ts';
import { hash, verify } from "https://deno.land/x/scrypt@v4.0.0/mod.ts";

export default {
  register: async (user: string, password: string) => {
    const passwordHash = hash(password);
    return await userRepository.register(user, passwordHash);
  },
  async updatePassword(user: string, password: string) {
    if (await this.login(user, password)) {
      console.info(`user ${user} found, updating password`);
      const passwordHash = hash(password);
      return await userRepository.updatePassword(user, passwordHash);
    } else {
      console.info(`user ${user} not found or password is incorrect`);
      return false;
    }
  },
  login: async (user: string, password: string) => {
    const passwordHash = await userRepository.login(user);
    return passwordHash ? verify(password, passwordHash) : false;
  },
  async unregister(user: string, password: string) {
    if (await this.login(user, password)) {
      return userRepository.unregister(user);
    } else {
      console.info(`user ${user} not found or password is incorrect`);
      return false;
    }
  }
}