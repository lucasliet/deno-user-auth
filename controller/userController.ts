import { OpineRequest, OpineResponse } from 'https://deno.land/x/opine@2.2.0/mod.ts';
import userService from '../service/userService.ts';
import { createUserToken } from '../config/authConfig.ts';

export default {
  register: async (req: OpineRequest, res: OpineResponse) => {
    const { user, password } = req.body;
    try {
      if (await userService.register(user, password)) {
        res.status = 201;
        res.json({ message: `user ${user} registered sucessfully` });
      }
      res.status = 400;
      res.json({ message: 'no user was registered!' });
    } catch (err) {
      console.error(err);
      res.status = 500;
      res.json({ error: err?.message ?? err });
    }
  },
  
  updatePassword: async (req: OpineRequest, res: OpineResponse) => {
    const { user, password } = req.body;
    try {
      if (await userService.updatePassword(user, password)) {
        res.status = 200;
        res.json({ message: `user ${user} password updated sucessfully` });
      }
      res.status = 400;
      res.json({ message: 'no user was updated!' });
    } catch (err) {
      console.error(err);
      res.status = 500;
      res.json({ error: err?.message ?? err });
    }
  },
  
  login: async (req: OpineRequest, res: OpineResponse) => {
    const { user, password } = req.body;
    try {
      if (await userService.login(user, password)) {
        res.status = 200;
        res.json({ access_key: await createUserToken(user)});
      }
      res.status = 400;
      res.json({ message: 'user or password invalid!' });
    } catch (err) {
      console.error(err);
      res.status = 500;
      res.json({ error: err?.message ?? err });
    }
  },
  
  unregister: async (req: OpineRequest, res: OpineResponse) => {
    const { user } = req.body;
    try {
      if (await userService.unregister(user)) {
        res.status = 200;
        res.json({ message: `user ${user} unregistered sucessfully` });
      }
      res.status = 400;
      res.json({ message: 'user or password invalid!' });
    } catch (err) {
      console.error(err);
      res.status = 500;
      res.json({ error: err?.message ?? err });
    }
  }
}