import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ShopmartFormServiceService } from 'src/app/services/shopmart-form-service.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

    checkoutFormGroup: FormGroup;

    totalPrice: number = 0.00;
    totalQuantity: number = 0;
    creditCardMonths: number[] = [];
    creditCardYears: number[] = [];
    countries: Country[] = [];

    shippingAddressStates: State[] = [];
    billingAddressStates: State[] = [];

    constructor(private checkoutService: CheckoutService, private cartService: CartService, private shopmartService: ShopmartFormServiceService, private formBuilder: FormBuilder, private router: Router) { }


    ngOnInit(): void {

        this.reviewCartDetails();
        this.checkoutFormGroup = this.formBuilder.group({
            customer: this.formBuilder.group({
                firstName: ['', [Validators.required, Validators.minLength(2)]],
                lastName: ['', [Validators.required, Validators.minLength(2)]],
                email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
            }),
            shippingAddress: this.formBuilder.group({
                street: [''],
                city: [''],
                state: [''],
                country: [''],
                zipCode: [''],
            }),
            billingAddress: this.formBuilder.group({
                street: [''],
                city: [''],
                state: [''],
                country: [''],
                zipCode: [''],
            }),
            creditCard: this.formBuilder.group({
                cardType: [''],
                nameOnCard: [''],
                cardNumber: [''],
                securityCode: [''],
                expirationMonth: [''],
                expirationYear: [''],
            }),
        });


        // populate credit card months
        const startMonth: number = new Date().getMonth() + 1;
        console.log("startMonth: " + startMonth);
        this.shopmartService.getCreditCardMonths(startMonth).subscribe(data => {
            console.log("Retrieved credit card months: " + JSON.stringify(data));
            this.creditCardMonths = data;
        });

        // populate credit card years
        this.shopmartService.getCreditCardYears().subscribe(data => {
            this.creditCardYears = data;
        });


        // populate Countries
        this.shopmartService.getCountries().subscribe(data => this.countries = data);
    }

    reviewCartDetails() {

        // subscribe to cartService totalQuantity
        this.cartService.totalQuantity.subscribe(totalQuantity => this.totalQuantity = totalQuantity);

        // subscribe to cartService totalPrice
        this.cartService.totalPrice.subscribe(totalPrice => this.totalPrice = totalPrice);
    }

    onSubmit() {
        console.log("Handling Submit button");

        if (this.checkoutFormGroup.invalid) {
            this.checkoutFormGroup.markAllAsTouched();
            return;
        }

        // set up order
        let order = new Order();
        order.totalPrice = this.totalPrice;
        order.totalQuantity = this.totalQuantity;

        // get card Items
        const cardItems = this.cartService.cartItems;

        // create orderItems from cartItems
        // - LONG WAY
        /* 
            let orderItems: OrderItem[] = [];
            for (let i = 0; i <= cardItems.length; i++) {
                orderItems[i] = new OrderItem(cardItems[i]);
            }
        */

        // -SHort WAY
        let orderItems: OrderItem[] = cardItems.map(tempCartItem => new OrderItem(tempCartItem));

        // set up Purchase
        let purchase = new Purchase();

        // populate purchase - customer
        purchase.customer = this.checkoutFormGroup.controls['customer'].value;

        // populate purchase - shipping Address 
        purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
        const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
        const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
        purchase.shippingAddress.state = shippingState.name;
        purchase.shippingAddress.country = shippingCountry.name;

        // populate purchase - billing Address
        purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
        const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
        const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
        purchase.billingAddress.state = billingState.name;
        purchase.billingAddress.country = billingCountry.name;

        // populate purchase - orders and orderItems
        purchase.order = order;
        purchase.orderItems = orderItems;

        // Call REST API via the CheckOutService

        this.checkoutService.placeOrder(purchase).subscribe({
            next: response => {
                alert(`Your order has been received. \nOrder Tracking Number: ${response.orderTrackingNumber}`);

                // RESET CART AFTER ORDER
                this.resetCart();
            },
            error: err => {
                alert(`There was an error : ${err.message}`);
            }
        });

    }


    resetCart() {
        // reset cart data
        this.cartService.cartItems = [];
        this.cartService.totalPrice.next(0);
        this.cartService.totalQuantity.next(0);

        // reset form data
        this.checkoutFormGroup.reset();

        // navigate to main Products Page
        this.router.navigateByUrl("/products");
    }

    copyShippingAddressToBillingAddress(event) {
        if (event.target.checked) {
            this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);

            this.billingAddressStates = this.shippingAddressStates;
        }
        else {
            this.checkoutFormGroup.controls.billingAddress.reset();

            this.billingAddressStates = [];
        }
    }

    handleMonthsAndYears() {
        const creditCardFormGroup = this.checkoutFormGroup.get("creditCard");

        const currentYear: number = new Date().getFullYear();
        const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);


        let startMonth: number;
        if (currentYear === selectedYear) {
            startMonth = new Date().getMonth() + 1;
        }
        else {
            startMonth = 1;
        }

        this.shopmartService.getCreditCardMonths(startMonth).subscribe(data => {
            this.creditCardMonths = data;
        })
    }

    getStates(formGroupName: string) {
        const formGroup = this.checkoutFormGroup.get(formGroupName);

        const countryCode = formGroup.value.country.code;
        const countryName = formGroup.value.country.name;

        this.shopmartService.getStates(countryCode).subscribe(data => {
            if (formGroupName === 'shippingAddress') {
                this.shippingAddressStates = data;
            }
            else {
                this.billingAddressStates = data;
            }

            formGroup.get('state').setValue(data[0]);
        });
    }

    get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
    get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
    get email() { return this.checkoutFormGroup.get('customer.email'); }
}
