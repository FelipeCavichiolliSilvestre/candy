import { Injectable } from "@nestjs/common";
import { Stripe } from "stripe";

@Injectable()
export class StripeService extends Stripe {}
