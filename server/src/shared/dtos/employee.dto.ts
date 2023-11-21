import { SafeEmployee } from "../../employees/safe-employee.type";
import { EmployeeRole } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class SafeEmployeeDTO implements SafeEmployee {
  id: string;
  username: string;
  @ApiProperty({ type: "string", enum: EmployeeRole })
  role: EmployeeRole;
}
