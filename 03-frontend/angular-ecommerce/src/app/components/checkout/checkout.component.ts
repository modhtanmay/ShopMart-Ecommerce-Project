import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
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

    constructor(private shopmartService: ShopmartFormServiceService, private formBuilder: FormBuilder) { }


    ngOnInit(): void {

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

    onSubmit() {
        console.log("Handling Submit button");

        if (this.checkoutFormGroup.invalid) {
            this.checkoutFormGroup.markAllAsTouched();
        }
        console.log(this.checkoutFormGroup.get("customer").value);
        console.log(this.checkoutFormGroup.get("customer").value.email);
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
