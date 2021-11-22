import {
  CATCH_PRODUCTS_ERROR,
  INIT_PRODUCTS_LOADING,
  GET_PRODUCTS,
} from "./products.constants";

export interface ProductsData {
  items: ProductInterface[];
  meta: {
    totalPages: number
  }
}

export interface ProductInterface {
  name: string;
  image: string;
  description: string;
  rating: number;
}

export interface ProductsState {
  data: ProductsData | null;
  isLoading: boolean;
  isError: boolean;
}

interface InitProductsLoadingAction {
  type: typeof INIT_PRODUCTS_LOADING;
  payload: null;
}

interface CatchProductsErrorAction {
  type: typeof CATCH_PRODUCTS_ERROR;
  payload: null;
}

interface GetProductsAction {
  type: typeof GET_PRODUCTS;
  payload: ProductsData;
}

export type ProductsActionTypes =
  | GetProductsAction
  | InitProductsLoadingAction
  | CatchProductsErrorAction;
