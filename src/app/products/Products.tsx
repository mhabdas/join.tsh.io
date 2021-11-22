import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Product from "app/product/Product";
import SearchBar from "app/searchBar/SearchBar";
import React, {
  ChangeEvent,
  Dispatch,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { AppRoute } from "routing/AppRoute.enum";
import {
  catchProductsError,
  getProductsAction,
  initProductsLoading,
} from "services/products/products.actions";
import {
  initialProductsState,
  productsReducer,
} from "services/products/products.reducer";
import { ProductsActionTypes } from "services/products/products.types";
import * as api from "services/products/products.api";
import { ProductInterface } from "../../services/products/products.types";
import ProductsList from "app/productsList/ProductsList";

const styles = {
  appBar: {
    backgroundColor: "white",
    height: {
      xs: "248px",
      md: "144px",
    },
    display: "flex",
    alignContent: "center",
    color: "black",
  },
  toolbar: {
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingTop: {
      xs: "30px",
      md: 0,
    },
  } as const,
  typography: {
    fontSize: "24px",
  },
  controlBar: {
    display: "flex",
    order: {
      xs: 3,
      md: 1,
    },
    flexWrap: "wrap",
  } as const,
  formGroup: {
    display: "flex",
    flexDirection: "row",
  } as const,
  link: {
    textDecoration: "none",
    border: "1px solid #4460F7",
    borderRadius: "4px",
    height: "38px",
    width: "88px",
    cursor: "pointer",
    color: "#4460F7",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Nunito",
    order: 2,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    p: {
      xs: "10px",
      md: "100px 100px 50px 100px",
    },
    backgroundColor: "#F2F2F2",
    fontFamily: "Nunito",
  } as const,
  box: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: {
      xs: "center",
      md: "space-between",
    },
  } as const,
  pagination: {
    m: "0 auto",
    paddingTop: "20px",
  },
};

export const Products = () => {
  const [productsState, dispatchProducts] = useReducer(
    productsReducer,
    initialProductsState
  );
  const [active, setActive] = useState<boolean>(false);
  const [promo, setPromo] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const getProducts = async (
    dispatch: Dispatch<ProductsActionTypes>,
    active: boolean,
    promo: boolean,
    searchValue: string
  ) => {
    dispatch(initProductsLoading());
    try {
      const response = await api.getProducts(page, active, promo, searchValue);
      dispatch(getProductsAction(response.data));
    } catch (error) {
      dispatch(catchProductsError(error as Error));
    }
  };

  useEffect(() => {
    getProducts(dispatchProducts, active, promo, searchValue);
  }, [active, promo, page]);

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      searchValue !== "" &&
        getProducts(dispatchProducts, active, promo, searchValue);
    }, 500);

    return () => clearTimeout(searchTimeout);
  }, [searchValue]);

  const handleActiveChecked = (event: ChangeEvent<HTMLInputElement>) => {
    setActive(event.target.checked);
  };

  const handlePromoChecked = (event: ChangeEvent<HTMLInputElement>) => {
    setPromo(event.target.checked);
  };

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) =>
    setPage(value);

  return (
    <>
      <AppBar position="static" sx={{ ...styles.appBar }}>
        <Toolbar variant="dense" sx={{ ...styles.toolbar }}>
          <Typography component="h2" sx={{ ...styles.typography }}>
            join.tsh.io
          </Typography>
          <Box sx={{ ...styles.controlBar }}>
            <SearchBar
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
            <FormGroup sx={{ ...styles.formGroup }}>
              <FormControlLabel
                control={
                  <Checkbox checked={active} onChange={handleActiveChecked} />
                }
                label="Active"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={promo} onChange={handlePromoChecked} />
                }
                label="Promo"
              />
            </FormGroup>
          </Box>
          <Link to={AppRoute.login} style={{ ...styles.link }}>
            Log in
          </Link>
        </Toolbar>
      </AppBar>
      <Paper
        elevation={0}
        sx={{
          ...styles.paper,
        }}
      >
        {!productsState.isLoading ? (
          <Box
            sx={{
              ...styles.box,
            }}
          >
            <ProductsList items={productsState.data?.items || []} />
          </Box>
        ) : (
          <CircularProgress size={100} />
        )}
        {Boolean(productsState.data?.items.length) && (
          <Pagination
            sx={{ ...styles.pagination }}
            count={productsState.data?.meta.totalPages}
            page={page}
            onChange={handlePageChange}
            boundaryCount={3}
          />
        )}
      </Paper>
    </>
  );
};
