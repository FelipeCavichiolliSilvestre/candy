import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { IEmployeesService } from "./employees.interface";
import { JwtPayload, Require } from "src/auth";
import {
  CreateEmployeeBodyDTO,
  EmployeeIdParamDTO,
  GetEmployeesQueryDTO,
  UpdateEmployeeBodyDTO,
} from "./dtos";
import { User } from "src/auth/decorators/user.decorator";
import { ApiTags } from "@nestjs/swagger";
import { UsersRole } from "src/auth/types";

@ApiTags("employees")
@Controller("/employees")
export class EmployeesController {
  constructor(private employeesService: IEmployeesService) {}

  @Get("/")
  async get(@Query() query: GetEmployeesQueryDTO) {
    return await this.employeesService.list(query.page);
  }

  @Get("/me")
  async getMe(@User() user: JwtPayload) {
    return await this.employeesService.findOne(user.id);
  }

  @Post("/")
  @Require(UsersRole.COOK)
  async create(@Body() body: CreateEmployeeBodyDTO) {
    return await this.employeesService.register(body);
  }

  @Patch("/:id")
  @Require(UsersRole.COOK)
  async update(
    @Param() param: EmployeeIdParamDTO,
    @Body() body: UpdateEmployeeBodyDTO
  ) {
    return await this.employeesService.update({ ...body, ...param });
  }

  @Delete("/:id")
  @Require(UsersRole.COOK)
  @HttpCode(204)
  async delete(@Param() param: EmployeeIdParamDTO) {
    await this.employeesService.remove(param.id);
  }
}
