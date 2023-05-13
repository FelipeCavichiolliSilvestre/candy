import { SetMetadata } from "@nestjs/common";

export const ALLOW_UNAUTHENTICATED_KEY = "ALLOW_UNAUTHENTICATED";
export function AllowUnauthenticated() {
  return SetMetadata(ALLOW_UNAUTHENTICATED_KEY, true);
}
