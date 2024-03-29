import { Category } from "./category.model";

export interface Product {

    productId: number;
    productName: string;
    productDescription: string;
    productUnitPrice: number;
    productIsAvailable: boolean;
    productImageURL: string;
    productMinQuantity: number;
    productMaxQuantity: number;
    productQuantityIncrement: number;
    productPopularityScore: number;
    productUnit: string;
    category: Category;
}
