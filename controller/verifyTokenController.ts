import { OpineRequest, OpineResponse } from 'https://deno.land/x/opine@2.2.0/mod.ts';
import verifyTokenService from '../service/verifyTokenService.ts';
import { AUTH_PAYLOAD_KEY } from '../config/authConfig.ts';

export default {
  verifyToken: (req: OpineRequest, res: OpineResponse) => {
    const tokenPayload = JSON.parse(req.headers.get(AUTH_PAYLOAD_KEY)!);
    const expires_in =
      verifyTokenService.getTokenExpirationSeconds(tokenPayload.exp);
    delete tokenPayload.exp;
    res.json({ expires_in, ...tokenPayload });
  }
}