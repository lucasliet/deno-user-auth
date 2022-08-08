import { dirname, join } from 'https://deno.land/std@0.137.0/path/win32.ts';
import opine, { json, serveStatic } from 'https://deno.land/x/opine@2.2.0/mod.ts';
import userController from './controller/userController.ts';
import verifyTokenController from './controller/verifyTokenController.ts';
import authMiddleware from './middleware/authMiddleware.ts';
import welcomePage from './page/Welcome/index.tsx';

const app = opine();

app.use(json());

app.use(serveStatic(join(dirname(import.meta.url), 'page', 'static')));

app.get('/', (_, res) => res.send(welcomePage()))

app.post('/register', userController.register);
app.put('/update_password', authMiddleware, userController.updatePassword);
app.post('/login', userController.login);
app.post('/unregister', authMiddleware, userController.unregister);

app.get('/verify_token', authMiddleware, verifyTokenController.verifyToken);

app.listen(3333);