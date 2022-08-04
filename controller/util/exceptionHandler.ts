import { OpineResponse } from "https://deno.land/x/opine@2.2.0/mod.ts";

export default function exceptionHandler(
  res: OpineResponse,
  callback: () => void
) {
  try {
    callback()
  } catch (err) {
    console.error(err);
    res.status = 500;
    res.send(err?.message ?? err);
  }
}