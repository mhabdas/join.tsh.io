import axios from "axios";
import { PRODUCTS_API } from "./products.constants";

export const getProducts = (
  page: number,
  active: boolean,
  promo: boolean,
  search: string
) =>
  axios.get(PRODUCTS_API, {
    params: {
      limit: 8,
      page,
      active: active || "",
      promo: promo || "",
      search,
    },
  });
