import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { AuthModule } from "./auth";
import { CartsModule } from "./carts";
import { CheckoutModule } from "./checkout";
import { ClientsModule } from "./clients";
import { EmployeesModule } from "./employees";
import { OrdersModule } from "./orders";
import { PrismaModule } from "./prisma";
import { ProductsModule } from "./products";
import { StripeModule } from "./stripe";
import { join } from "path";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "static"),
      serveRoot: "/docs",
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    AuthModule,
    CartsModule,
    CheckoutModule,
    ClientsModule,
    EmployeesModule,
    OrdersModule,
    ProductsModule,
    StripeModule,
  ],
})
export class AppModule {}
