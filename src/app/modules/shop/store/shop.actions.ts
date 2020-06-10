import { Product } from './../models/product.model';
import { Action } from "@ngrx/store";

export const GET_PRODUCT_DETAILS = '[Shop] Get product details';
export const GET_PRODUCT_DETAILS_SUCCESS = '[Shop] Get product details success';

export const GET_SIMILAR_PRODUCTS = '[Shop] Get similar products';
export const GET_SIMILAR_PRODUCTS_SUCCESS = '[Shop] Get similar products success';

export const GET_ALL_PRODUCTS = '[Shop] Get all products';
export const GET_ALL_PRODUCTS_SUCCESS = '[Shop] Get all products success';


export const GET_WISHLIST_PRODUCTS = '[Shop] Get wishlist';
export const GET_WISHLIST_PRODUCTS_SUCCESS = '[Shop] Get wishlist success';

export class GetWishlistProducts implements Action {
    readonly type = GET_WISHLIST_PRODUCTS;
}

export class GetWishlistProductsSuccess implements Action {
    readonly type = GET_WISHLIST_PRODUCTS_SUCCESS;
    constructor(public payload: Product[]) { }
}

export class GetProductDetails implements Action {
    readonly type = GET_PRODUCT_DETAILS;
    constructor(public payload: string) { }
}

export class GetProductDetailsSuccess implements Action {
    readonly type = GET_PRODUCT_DETAILS_SUCCESS;
    constructor(public payload: Product) { }
}

export class GetSimilarProducts implements Action {
    readonly type = GET_SIMILAR_PRODUCTS;
    constructor(public product: Product, public count: number) { }
}

export class GetSimilarProductsSuccess implements Action {
    readonly type = GET_SIMILAR_PRODUCTS_SUCCESS;
    constructor(public payload: Product[]) { }
}

export class GetAllProducts implements Action {
    readonly type = GET_ALL_PRODUCTS;
}

export class GetAllProductsSuccess implements Action {
    readonly type = GET_ALL_PRODUCTS_SUCCESS;
    constructor(public payload: Product[]) { }
}

export type All =
    GetAllProducts |
    GetAllProductsSuccess |
    GetProductDetails |
    GetProductDetailsSuccess |
    GetSimilarProducts |
    GetSimilarProductsSuccess |
    GetWishlistProducts |
    GetWishlistProductsSuccess;
