import opine, { json } from 'https://deno.land/x/opine@2.2.0/mod.ts';
import userController from './controller/userController.ts';
import authMiddleware from './middleware/authMiddleware.ts'

const app = opine();

app.use(json());

app.get('/', (_, res) => res.json({ message: 'welcome!' }));

app.post('/register', userController.register);
app.put('/update_password', authMiddleware, userController.updatePassword);
app.post('/login', userController.login);
app.post('/unregister', authMiddleware, userController.unregister);

app.listen();