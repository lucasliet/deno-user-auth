import opine, { json, OpineRequest, OpineResponse } from 'https://deno.land/x/opine@2.2.0/mod.ts';
import userController from './controller/userController.ts';

const app = opine();

const exceptionHandler = (
  req: OpineRequest,
  res: OpineResponse,
  callback: (req: OpineRequest, res: OpineResponse) => void
) => {
  try {
    callback(req,res)
  } catch (err) {
    console.error(err);
    res.status = 500;
    res.send(err?.message ?? err);
  }
}

app.use(json());

app.get('/', (_, res) => res.json({ message: 'welcome!' }));

app.post('/register', (req, res) => exceptionHandler(req, res, userController.register));
app.post('/login', (req, res) => exceptionHandler(req, res, userController.login));
app.post('/unregister', (req, res) => exceptionHandler(req, res, userController.unregister))

app.listen();