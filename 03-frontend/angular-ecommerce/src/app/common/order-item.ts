import { CartItem } from './cart-item';

export class OrderItem {

    imageUrl: string;
    unitPrice: number;
    quantity: number;
    productId: string;

    constructor(cardItem: CartItem) {
        this.imageUrl = cardItem.imageUrl;
        this.quantity = cardItem.quantity;
        this.unitPrice = cardItem.unitPrice;
        this.productId = cardItem.id;
    }
}
