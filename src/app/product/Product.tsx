import React from "react";
import Card from "@mui/material/Card";
import { ProductInterface } from "services/products/products.types";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

type Props = {
  product: ProductInterface;
};

const styles = {
  card: {
    maxWidth: "288px",
    marginBottom: "16px",
  },
  typography: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  cardContent: {
    height: "150px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  } as const,
  button: {
    width: "100%",
    textTransform: "none",
  } as const,
};

export const Product = (props: Props) => {
  const { product } = props;

  return (
    <Card sx={{ ...styles.card }} elevation={0}>
      <CardMedia component="img" image={product.image} />
      <CardHeader
        title={product.name}
        titleTypographyProps={{ sx: { ...styles.typography } }}
      />
      <CardContent sx={{ ...styles.cardContent }}>
        {product.description}
        <Rating value={product.rating} />
      </CardContent>
      <CardActions>
        <Button variant="contained" disableElevation sx={{ ...styles.button }}>
          Show details
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
