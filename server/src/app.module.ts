import { Module } from "@nestjs/common";
import { AuthModule } from "./auth";
import { EmployeesModule } from "./employees";
import { OrdersModule } from "./orders";
import { PrismaModule } from "./prisma";
import { ProductsModule } from "./products";

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    EmployeesModule,
    OrdersModule,
    ProductsModule,
  ],
})
export class AppModule {}
