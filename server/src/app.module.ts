import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth";
import { EmployeesModule } from "./employees";
import { OrdersModule } from "./orders";
import { PrismaModule } from "./prisma";
import { ProductsModule } from "./products";
import { WhatsappModule } from "./whatsapp/whatsapp.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    EmployeesModule,
    OrdersModule,
    ProductsModule,
    WhatsappModule,
  ],
})
export class AppModule {}
