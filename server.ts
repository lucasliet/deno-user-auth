import opine, { json } from 'https://deno.land/x/opine@2.2.0/mod.ts';
import userController from './controller/userController.ts';
import authMiddleware from './middleware/authMiddleware.ts'

const app = opine();

app.use(json());

app.get('/', (_, res) =>
  res.json({ welcome_message: 'Please login at https://deno-middleware.deno.dev/login to start' })
);

app.post('/register', userController.register);
app.put('/update_password', authMiddleware, userController.updatePassword);
app.post('/login', userController.login);
app.post('/unregister', authMiddleware, userController.unregister);

app.get('/verify_token', authMiddleware, (req, res) =>
  res.json(JSON.parse(req.headers.get('auth_payload')!))
);

app.listen();