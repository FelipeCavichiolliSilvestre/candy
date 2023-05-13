import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { IEmployeesService } from "./employees.interface";
import { Require } from "src/auth";
import { EmployeeRole } from "@prisma/client";
import {
  CreateEmployeeBodyDTO,
  EmployeeIdParamDTO,
  GetEmployeesQueryDTO,
  UpdateEmployeeBodyDTO,
} from "./dtos";

@Controller("/employees")
export class EmployeesController {
  constructor(private employeesService: IEmployeesService) {}

  @Get("/")
  async get(@Query() query: GetEmployeesQueryDTO) {
    return await this.employeesService.list(query.page);
  }

  @Post("/")
  @Require(EmployeeRole.COOK)
  async create(@Body() body: CreateEmployeeBodyDTO) {
    return await this.employeesService.register(body);
  }

  @Patch("/:id")
  @Require(EmployeeRole.COOK)
  async update(
    @Param() param: EmployeeIdParamDTO,
    @Body() body: UpdateEmployeeBodyDTO
  ) {
    return await this.employeesService.update({ ...body, ...param });
  }

  @Delete("/:id")
  @Require(EmployeeRole.COOK)
  async delete(@Param() param: EmployeeIdParamDTO) {
    return await this.employeesService.remove(param.id);
  }
}
