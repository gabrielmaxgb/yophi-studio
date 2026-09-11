import { randomBytes } from "node:crypto";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";

/** Human-copyable provisional password. Length matches Better Auth min (10). */
export function generateTemporaryPassword(length = 12) {
  const bytes = randomBytes(length);
  let out = "";
  for (const byte of bytes) {
    out += ALPHABET[byte % ALPHABET.length];
  }
  return out;
}
