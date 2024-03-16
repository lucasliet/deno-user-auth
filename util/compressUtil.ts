import { encodeBase64, decodeBase64 } from "https://deno.land/std@0.220.1/encoding/base64.ts";
import { compress, decompress } from "https://deno.land/x/brotli@0.1.7/mod.ts";

export function compressText(data: string): string {
  return encodeBase64(compress(new TextEncoder().encode(data)));
}

export function decompressText(data: string): string {
  return new TextDecoder().decode(decompress(decodeBase64(data)));
}

export function compressObject(data: object): string {
  return compressText(JSON.stringify(data));
}

export function decompressObject<T>(data: string): T {
  return JSON.parse(decompressText(data)) as T;
}