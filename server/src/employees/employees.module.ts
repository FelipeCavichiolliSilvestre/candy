import { Module } from "@nestjs/common";
import { EmployeesController } from "./employees.controller";
import { IEmployeesService } from "./employees.interface";
import { EmployeesService } from "./employees.service";

@Module({
  controllers: [EmployeesController],
  providers: [{ provide: IEmployeesService, useClass: EmployeesService }],
})
export class EmployeesModule {}
