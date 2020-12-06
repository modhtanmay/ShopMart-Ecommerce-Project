import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginJwtComponent } from './_components/login-jwt/login-jwt.component';
import { RegisterJwtComponent } from './_components/register-jwt/register-jwt.component';
import { HomeComponent } from './_components/home/home.component';
import { ProfileComponent } from './_components/profile/profile.component';
import { BoardAdminComponent } from './_components/board-admin/board-admin.component';
import { BoardModeratorComponent } from './_components/board-moderator/board-moderator.component';
import { BoardUserComponent } from './_components/board-user/board-user.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';

export const routes: Routes = [

    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginJwtComponent },
    { path: 'register', component: RegisterJwtComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'user', component: BoardUserComponent },
    { path: 'mod', component: BoardModeratorComponent },
    { path: 'admin', component: BoardAdminComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    { path: 'checkout', component: CheckoutComponent },
    { path: 'cart-details', component: CartDetailsComponent },
    { path: 'search/:keyword', component: ProductListComponent },
    { path: 'category/:id/:name', component: ProductListComponent },
    { path: 'products/:id', component: ProductDetailsComponent },
    { path: 'category', component: ProductListComponent },
    { path: 'products', component: ProductListComponent },
    // { path: 'login', component: LoginComponent },
    // { path: 'register', component: RegistrationComponent },
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: '**', redirectTo: '/products', pathMatch: 'full' }
];


@NgModule({
    declarations: [
        AppComponent,
        ProductListComponent,
        ProductCategoryMenuComponent,
        LoginComponent,
        RegistrationComponent,
        SearchComponent,
        ProductDetailsComponent,
        CartStatusComponent,
        CartDetailsComponent,
        CheckoutComponent,
        LoginJwtComponent,
        RegisterJwtComponent,
        HomeComponent,
        ProfileComponent,
        BoardAdminComponent,
        BoardModeratorComponent,
        BoardUserComponent,

    ],
    imports: [
        RouterModule.forRoot(routes), FormsModule,
        BrowserModule, HttpClientModule, ReactiveFormsModule
    ],
    providers: [authInterceptorProviders],
    bootstrap: [AppComponent]
})
export class AppModule { }
