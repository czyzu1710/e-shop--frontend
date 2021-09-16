import React, {useEffect} from "react";
import { ProductsList } from "./ProductsList";
import { Box } from "@material-ui/core";
import "./ProductsPage.css";
import {useLocation} from "react-router-dom"

export const ProductsPage = () => {

  return (
    <Box className="products-page-main-container">
      <ProductsList />
    </Box>
  );
};
