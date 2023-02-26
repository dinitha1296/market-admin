import { ValidationMessages } from "../model";

export const PRODUCT_VALIDATION_MESSAGES: ValidationMessages = {
  productName: [
    {type: 'required', message: 'Product name is required'}
  ],
  productDescription: [],
  productUnitPrice: [
    {type: 'required', message: 'Product unit price is required'}
  ],
  productUnit: [],
  productMinQuantity: [
    {type: 'required', message: 'Product min quantity is required'}
  ],
  productMaxQuantity: [
    {type: 'required', message: 'Product max quantity is required'}
  ],
  productQuantityIncrement: [
    {type: 'required', message: 'Product quantity increment is required'}
  ],
  productPopularityScore: [],
  category: [
    {type: 'required', message: 'Category is required'}
  ]
}