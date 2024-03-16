import userRepository from '../repository/userRepository.ts';
import { hash, verify } from 'https://deno.land/x/scrypt@v4.0.0/mod.ts';

export default {
  register: async (user: string, password: string): Promise<boolean> => {
    const passwordHash = hash(password);
    return await userRepository.register(user, passwordHash);
  },
  
  updatePassword: async (user: string, password: string): Promise<boolean> => {
    const passwordHash = hash(password);
    return await userRepository.updatePassword(user, passwordHash);
  },
  
  login: async (user: string, password: string): Promise<string | false> => {
    const userData = await userRepository.login(user);
    return userData && verify(password, userData.passwordHash) ? userData.id : false;
  },
  
  unregister: async (user: string): Promise<boolean> => {
    await userRepository.unregister(user);
    return Promise.resolve(true);
  }
}