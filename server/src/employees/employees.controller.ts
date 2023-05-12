import { Controller } from "@nestjs/common";
import { IEmployeesService } from "./employees.interface";

@Controller("/employees")
export class EmployeesController {
  constructor(private employeesService: IEmployeesService) {}
}
