import { AES, enc } from "crypto-js";

const hashKey =
  "617ae4fd8e2703a988540f99abee557057e9612078b9fcf640026f3a491f55745bea6941eed163a2685ae506ea82e415bea28d526010333b2fad7f6dbfb6dbbd";

export function hashToken(date: Date) {
  return AES.encrypt(`${date}`, hashKey).toString();
}

export function verifyToken(token: string) {
  try {
    const decoded = AES.decrypt(token, hashKey).toString(enc.Utf8);
    const date = new Date(decoded);

    const timestamp1 = date.getTime();
    const timestamp2 = new Date().getTime();

    // Calculate the difference between the timestamps
    const differenceInMilliseconds = Math.abs(timestamp2 - timestamp1);

    // Convert the difference from milliseconds to seconds
    const differenceInSeconds = differenceInMilliseconds / 10000;

    if (differenceInSeconds < 3) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}
