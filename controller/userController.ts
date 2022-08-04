import { OpineRequest, OpineResponse } from 'https://deno.land/x/opine@2.2.0/mod.ts';
import userService from '../service/userService.ts';

export default {
  register: async (req: OpineRequest, res: OpineResponse) => {
    const { user, password } = req.body;
    try {
      if(await userService.register(user, password)){
        res.status = 201;
        res.json({ message: `user ${user} registered sucessfully` });
      }
      res.status = 400;
      res.json({ message: 'no user was persisted!' });
    } catch (err) {
      console.error(err);
      res.status = 500;
      res.send(err?.message ?? err);
    }
  },
  login: async (req: OpineRequest, res: OpineResponse) => {
    const { user, password } = req.body;
    try {
      if (await userService.login(user, password)) {
        res.status = 204;
        res.send();
      }
      res.status = 400;
      res.json({ message: 'user or password invalid!' });
    } catch (err) {
      console.error(err);
      res.status = 500;
      res.send(err?.message ?? err);
    }
  },
  unregister: async (req: OpineRequest, res: OpineResponse) => {
    const { user, password } = req.body;
    try {
      if (await userService.unregister(user, password)) {
        res.status = 204;
        res.send();
      }
      res.status = 400;
      res.json({ message: 'user or password invalid!' });
    } catch (err) {
      console.error(err);
      res.status = 500;
      res.send(err?.message ?? err);
    }
  }
}