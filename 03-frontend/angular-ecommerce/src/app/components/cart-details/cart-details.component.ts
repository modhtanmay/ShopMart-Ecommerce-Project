import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { ShopmartFormServiceService } from 'src/app/services/shopmart-form-service.service';

@Component({
    selector: 'app-cart-details',
    templateUrl: './cart-details.component.html',
    styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

    cartItems: CartItem[] = [];
    totalPrice: number = 0;
    totalQuantity: number = 0;

    constructor(private cartService: CartService) { }

    ngOnInit(): void {
        this.listCartDetails();
    }

    listCartDetails() {

        this.cartItems = this.cartService.cartItems; // getHandle to cart items

        this.cartService.totalPrice.subscribe(data => this.totalPrice = data); // subscribe to cart totalPrice

        this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data); // subscribe to cart totalQuantity


        this.cartService.computeCartTotals(); // compute cart total price and quantity

    }

    incrementQuantity(theCartItem: CartItem) {
        this.cartService.addToCart(theCartItem);
    }

    decrementQuantity(theCartItem: CartItem) {
        this.cartService.decrementQuantity(theCartItem);
    }

    removeCartItem(theCartItem: CartItem) {
        this.cartService.remove(theCartItem);
    }

}
