import moment from "https://deno.land/x/momentjs@2.29.1-deno/mod.ts";

export default {
  getTokenExpirationSeconds: (expirationUnix: number) => {
    const now = moment();
    return moment.unix(expirationUnix).diff(now, 'seconds');
  }
}