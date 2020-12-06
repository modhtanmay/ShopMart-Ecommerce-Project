import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private baseUrlProduct = 'http://localhost:9090/api/products';   //Now hardcoded later will be taken from config File

    private baseUrlCategory = 'http://localhost:9090/api/product-category';

    private welcomeUrl = 'http://localhost:9090/welcome';

    constructor(private httpClient: HttpClient) { }

    getProductList(theCategoryId: number): Observable<Product[]> {     //Returns an Obsevable => Map the JSON data from Spring Data REST to Product Array

        const searchUrl = `${this.baseUrlProduct}/search/findByCategoryId?id=${theCategoryId}`;

        return this.getProducts(searchUrl);
    }


    getProductCategories(): Observable<ProductCategory[]> {
        return this.httpClient.get<GetResponseCategories>(this.baseUrlCategory).pipe(map(response => response._embedded.productCategory));

    }

    searchProducts(theKeyword: string): Observable<Product[]> {

        const searchUrl = `${this.baseUrlProduct}/search/findByNameContaining?name=${theKeyword}`;

        return this.getProducts(searchUrl);
    }

    private getProducts(searchUrl: string): Observable<Product[]> {
        return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map(response => response._embedded.products));
    }

    getProduct(productId: number): Observable<Product> {
        // build url based on ProductID
        const productUrl = `${this.baseUrlProduct}/${productId}`;
        return this.httpClient.get<Product>(productUrl);

    }

    getWelcome(): Observable<any> {
        return this.httpClient.get(`${this.welcomeUrl}`);
    }
}

interface GetResponseProducts {
    _embedded: {                                       // Unwraps the JSON from Spring Data REST _embedded entry. 
        products: Product[];
    }
}

interface GetResponseCategories {
    _embedded: {
        productCategory: ProductCategory[];
    }
}