import { CATCH_PRODUCTS_ERROR, INIT_PRODUCTS_LOADING, GET_PRODUCTS } from './products.constants';
import { ProductsData } from './products.types';

export const initProductsLoading = () => ({
  type: INIT_PRODUCTS_LOADING,
  payload: null,
});

export const catchProductsError = (error: Error) => ({
  type: CATCH_PRODUCTS_ERROR,
  payload: null,
  error
});

export const getProductsAction = (data: ProductsData) => ({
  type: GET_PRODUCTS,
  payload: data,
});