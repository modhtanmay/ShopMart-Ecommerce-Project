import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
    providedIn: 'root'
})
export class CartService {


    cartItems: CartItem[] = [];

    totalPrice: Subject<number> = new Subject<number>();

    totalQuantity: Subject<number> = new Subject<number>();

    constructor() { }

    addToCart(theCartItem: CartItem) {

        let alreadyExistsInCart: boolean = false;
        let existingCartItem: CartItem = undefined;

        if (this.cartItems.length > 0) {

            for (let tempCartItem of this.cartItems) {
                if (tempCartItem.id === theCartItem.id) {
                    existingCartItem = tempCartItem;
                    break;
                }
            }

            alreadyExistsInCart = (existingCartItem != undefined);
        }


        if (alreadyExistsInCart) {
            existingCartItem.quantity++;
        }
        else {
            this.cartItems.push(theCartItem);
        }


        this.computeCartTotals();
    }


    computeCartTotals() {

        let totalPriceValue: number = 0;
        let totalQuantityValue: number = 0;

        for (let currentCartItem of this.cartItems) {
            totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
            totalQuantityValue += currentCartItem.quantity;
        }


        this.totalPrice.next(totalPriceValue);
        this.totalQuantity.next(totalQuantityValue);

        this.logCartData(totalPriceValue, totalQuantityValue);
    }


    logCartData(totalPriceValue: number, totalQuantityValue: number) {
        console.log('contents of Cart');
        for (let tempCartItem of this.cartItems) {
            const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
            console.log(`name:${tempCartItem.name},quantity=${tempCartItem.quantity},unitPrice = ${tempCartItem.unitPrice},subTotalPrice=${subTotalPrice}`);
        }
        console.log(`TotalPrice: ${totalPriceValue.toFixed(2)},totalQuantity:${totalQuantityValue}`);
        console.log('---');
    }


    decrementQuantity(theCartItem: CartItem) {

        theCartItem.quantity--;

        if (theCartItem.quantity === 0) {
            this.remove(theCartItem);
        }
        else {
            this.computeCartTotals();
        }

    }


    remove(theCartItem: CartItem) {

        // get index of itemm in array
        const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === theCartItem.id);

        // if found remove the item from the array at given index
        if (itemIndex > -1) {
            this.cartItems.splice(itemIndex, 1);

            this.computeCartTotals();
        }

    }
}
