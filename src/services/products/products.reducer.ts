import { CATCH_PRODUCTS_ERROR, INIT_PRODUCTS_LOADING, GET_PRODUCTS } from './products.constants';
import { ProductsActionTypes, ProductsState } from './products.types';


export const initialProductsState: ProductsState = {
  data: null,
  isLoading: false,
  isError: false
};

export const productsReducer = (state: ProductsState, action: ProductsActionTypes) => {
  switch (action.type) {
    case INIT_PRODUCTS_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: null
      };
    case CATCH_PRODUCTS_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: null
      };
    case GET_PRODUCTS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    default:
      return state;
  }
};