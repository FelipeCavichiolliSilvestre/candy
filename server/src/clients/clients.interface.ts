import { Injectable } from "@nestjs/common";
import { SafeClient } from "./safe-client.dto";

@Injectable()
export abstract class IClientsService {
  abstract findOne(id: string): Promise<SafeClient>;
  abstract signUp(data: SignUpInput): Promise<void>;
}

export type SignUpInput = {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
};
