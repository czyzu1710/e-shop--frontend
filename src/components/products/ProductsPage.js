import React from "react";
import { ProductsList } from "./ProductsList";
import { Box } from "@material-ui/core";
import "./ProductsPage.css";
export const ProductsPage = () => {
  return (
    <Box className="products-page-main-container">
      <ProductsList />
    </Box>
  );
};
