import { verify } from "https://deno.land/x/djwt@v2.7/mod.ts";
import { NextFunction, OpineRequest, OpineResponse } from "https://deno.land/x/opine@2.2.0/mod.ts";
import jwtSecretKey from '../config/authKey.ts';

export default async function Authorize(req: OpineRequest, res: OpineResponse, next: NextFunction) {
  const auth = req.headers.get('authorization')?.split('Bearer ')[1];
  if (!auth) res.sendStatus(401);

  const payload = await verify(auth!, jwtSecretKey).catch(_ =>
    res.sendStatus(403)
  );
  req.headers.append('auth_payload', JSON.stringify(payload));
  next()
}