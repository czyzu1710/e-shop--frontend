import React, {useEffect} from "react";
import { ProductsList } from "./ProductsList";
import { Box } from "@material-ui/core";
import "./ProductsPage.css";
import {useLocation} from "react-router-dom"

export const ProductsPage = () => {
  const location = useLocation()
  useEffect(() => {

    const query = new URLSearchParams(location.search);
    console.log(query)
    const paramEmail = query.get("email");
    const paramAuth = query.get("authenticator");
    if (paramEmail) {
      document.cookie = `email=${paramEmail}; path=/`;
      document.cookie = `oAuth=true; path=/`;
      if (paramAuth != null) {
        document.cookie = `authenticator=${decodeURIComponent(
            paramAuth
        ).replaceAll(" ", "+")}; path=/`;
      }
      window.location.href = "/product";
    }

    console.log(paramAuth)
    console.log(paramEmail)
  }, []);

  return (
    <Box className="products-page-main-container">
      <ProductsList />
    </Box>
  );
};
