export abstract class ICheckoutService {
    abstract checkoutCart(data: CheckoutCartInput): Promise<CheckoutOutput>;
    abstract checkoutOrder(data: CheckoutOrderInput): Promise<CheckoutOutput>;
}

export type CheckoutCartInput = {
    clientId: string;
    address: string;
};

export type CheckoutOrderInput = {
    orderId: string;
};

export type CheckoutOutput = {
    orderId: string;
    checkoutLink: string;
};
