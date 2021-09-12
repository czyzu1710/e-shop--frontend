import React, {useEffect, useState} from "react";
import {ProductItem} from "./ProductItem";
import ProductService from "../../services/products";
import {Box, CircularProgress, Button} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";
import "./ProductList.css";

export const ProductsList = (props) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    ProductService.getPage(page).then((response) => {
      setProducts(response.data.cloths);
      setNumberOfPages(response.data.count);
      setLoading(false);
    });
  }, [page]);

  if (isLoading) {
    return (
        <Box className="product-list-placeholder">
          <CircularProgress variant="indeterminate"/>
        </Box>
    );
  }
  return (
      <Box>
        <Box className="product-list-grid-container">
          {products.map((el, index) => {
            return <ProductItem {...el} key={index}/>;
          })}
        </Box>
        <Box className="product-list-pagination-container">
          <Pagination
              count={numberOfPages}
              page={page + 1}
              onChange={(event, page) => setPage(page - 1)}
          />
        </Box>
      </Box>
  );
};
