import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class IClientsService {
  abstract signUp(data: SignUpInput): Promise<void>;
}

export type SignUpInput = {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
};
