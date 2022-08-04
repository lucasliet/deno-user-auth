import { OpineRequest, OpineResponse } from 'https://deno.land/x/opine@2.2.0/mod.ts';
import userService from '../service/userService.ts';

export default {
  register: async (req: OpineRequest, res: OpineResponse) => {
    const { user, password } = req.body;
    if (await userService.register(user, password)) {
      res.status = 201;
      res.json({ message: `user ${user} registered sucessfully` });
    }
    res.status = 400;
    res.json({ message: 'no user was persisted!' });
  },
  login: async (req: OpineRequest, res: OpineResponse) => {
    const { user, password } = req.body;
    if (await userService.login(user, password)) {
      res.status = 204;
      res.send();
    }
    res.status = 400;
    res.json({ message: 'user or password invalid!' });
  },
  unregister: async (req: OpineRequest, res: OpineResponse) => {
    const { user, password } = req.body;
    if (await userService.unregister(user, password)) {
      res.status = 204;
      res.send();
    }
    res.status = 400;
    res.json({ message: 'user or password invalid!' });
  }
}