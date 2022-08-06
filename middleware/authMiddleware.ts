import { verify } from 'https://deno.land/x/djwt@v2.7/mod.ts';
import { NextFunction, OpineRequest, OpineResponse } from 'https://deno.land/x/opine@2.2.0/mod.ts';
import { JWS_SECRET_TOKEN, AUTH_PAYLOAD_KEY } from '../config/authConfig.ts';

export default async function authorize(req: OpineRequest, res: OpineResponse, next: NextFunction) {
  const auth = req.headers.get('authorization')?.split('Bearer ')[1];
  if (!auth) res.sendStatus(401);

  const payload = await verify(auth!, JWS_SECRET_TOKEN).catch(_ =>
    res.sendStatus(403)
  );
  req.headers.append(AUTH_PAYLOAD_KEY, JSON.stringify(payload));
  
  next();
}