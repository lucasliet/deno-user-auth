import { dirname, join } from 'https://deno.land/std@0.137.0/path/win32.ts';
import opine, { json, serveStatic } from 'https://deno.land/x/opine@2.2.0/mod.ts';
import { opineCors } from 'https://deno.land/x/cors@v1.2.2/mod.ts';
import userController from './controller/userController.ts';
import verifyTokenController from './controller/verifyTokenController.ts';
import authMiddleware from './middleware/authMiddleware.ts';
import welcomePage from './page/Welcome/index.tsx';

const app = opine();

// Middleware de logging
app.use(async (req, _, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${req.method} ${req.url} - ${ms}ms`);
});

// Middleware para servir o robots.txt
app.use(async (req, res, next) => {
  if (req.url === '/robots.txt') {
    try {
      const robotsTxt = await Deno.readTextFile('./static/robots.txt');
      res.type('text/plain').send(robotsTxt);
    } catch (_error) {
      res.status = 200;
      res.type('text/plain').send('User-agent: *\nDisallow: /');
    }
  } else {
    await next();
  } 
});

app.use(opineCors());
app.use(json());

app.use(serveStatic(join(dirname(import.meta.url), 'page', 'static')));

app.get('/', (_, res) => res.send(welcomePage()))

app.post('/register', userController.register);
app.put('/update_password', authMiddleware, userController.updatePassword);
app.post('/login', userController.login);
app.post('/unregister', authMiddleware, userController.unregister);

app.get('/verify_token', authMiddleware, verifyTokenController.verifyToken);

app.listen(3333);
