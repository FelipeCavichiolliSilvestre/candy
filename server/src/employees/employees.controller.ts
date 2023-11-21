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
  GetEmployeesResponseDTO,
  UpdateEmployeeBodyDTO,
} from "./dtos";
import { User } from "src/auth/decorators/user.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UsersRole } from "src/auth/types";
import { SafeEmployeeDTO } from "../shared/dtos";

@Controller("/employees")
@ApiTags("employees")
@ApiBearerAuth()
export class EmployeesController {
  constructor(private employeesService: IEmployeesService) {}

  @Get("/")
  async get(
    @Query() query: GetEmployeesQueryDTO
  ): Promise<GetEmployeesResponseDTO> {
    return await this.employeesService.list(query.page);
  }

  @Get("/me")
  async getMe(@User() user: JwtPayload): Promise<SafeEmployeeDTO> {
    return await this.employeesService.findOne(user.id);
  }

  @Post("/")
  @Require(UsersRole.COOK)
  async create(@Body() body: CreateEmployeeBodyDTO): Promise<SafeEmployeeDTO> {
    return await this.employeesService.register(body);
  }

  @Patch("/:employeeId")
  @Require(UsersRole.COOK)
  async update(
    @Param() param: EmployeeIdParamDTO,
    @Body() body: UpdateEmployeeBodyDTO
  ): Promise<SafeEmployeeDTO> {
    return await this.employeesService.update({ ...body, ...param });
  }

  @Delete("/:employeeId")
  @Require(UsersRole.COOK)
  @HttpCode(204)
  async delete(@Param() param: EmployeeIdParamDTO) {
    await this.employeesService.remove(param.employeeId);
  }
}
