import { SafeClient } from "../../clients/safe-client.dto";

export class SafeClientDTO implements SafeClient {
  id: string;
  email: string;
  phoneNumber: string;
  username: string;
}
