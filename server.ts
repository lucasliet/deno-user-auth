import opine, { json } from 'https://deno.land/x/opine@2.2.0/mod.ts';
import userController from './controller/userController.ts';

const app = opine();

app.use(json());

app.get('/', (_, res) => res.json({ message: 'welcome!' }));

app.post('/register', userController.register);
app.put('/update_password', userController.updatePassword);
app.post('/login', userController.login);
app.post('/unregister', userController.unregister);

app.listen();