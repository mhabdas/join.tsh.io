import { ProductInterface } from "../../services/products/products.types";
import Product from "app/product/Product";
import React from "react";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

type Props = {
  items: ProductInterface[];
};

const styles = {
  paper: {
    height: 344,
    width: 600,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  } as const,
  typographyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  } as const,
  icon: {
    fontSize: 80 
  }
};

const ProductsList = (props: Props) => {
  const { items } = props;
  return items.length > 0 ? (
    <>
      {items.map((product: ProductInterface) => (
        <Product product={product} />
      ))}
    </>
  ) : (
    <Paper elevation={0} sx={{ ...styles.paper }}>
      <ContentPasteIcon sx={{ ...styles.icon }} />
      <Typography sx={{ ...styles.typographyTitle }}>Ooops… It’s empty here</Typography>
      <Typography>There are no products on the list</Typography>
    </Paper>
  );
};

export default ProductsList;
