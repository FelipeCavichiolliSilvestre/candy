import { Module } from "@nestjs/common";
import { CheckoutController } from "./checkout.controller";
import { ICheckoutService } from "./checkout.interface";
import { CheckoutService } from "./checkout.service";

@Module({
  controllers: [CheckoutController],
  providers: [{ provide: ICheckoutService, useClass: CheckoutService }],
  exports: [ICheckoutService],
})
export class CheckoutModule {}
