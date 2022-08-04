import userRepository from '../repository/userRepository.ts';
import * as bcrypt from 'https://deno.land/x/bcrypt@v0.4.0/mod.ts';

export default {
  register: async (user: string, password: string) => {
    const passwordHash = await bcrypt.hash(password);
    await userRepository.register(user, passwordHash);
    return { message: `user ${user} registered sucessfully` };
  },
  login: async (user: string, password: string) => {
    const passwordHash = await bcrypt.hash(password);
    return await userRepository.login(user, passwordHash);
  }
}