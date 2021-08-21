import React, { useEffect, useState } from "react";
import { ProductItem } from "./ProductItem";
import ProductService from "../../services/products";
import { Box, CircularProgress, Button } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useLocation } from "react-router-dom";
import SingleChoiceList from "../../common/CategoryList/SingleChoiceList";
import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router-dom";
import BrandService from "../../services/brand";
import CategoriesService from "../../services/categories";
import DeleteIcon from "@material-ui/icons/Delete";
import ForToComponent from "../../common/CategoryList/ForToComponent";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import "./ProductList.css";

export const ProductsList = (props) => {
  let location = useLocation();
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [gender, setGender] = useState([
    { name: "Kobiety", isSelected: false, id: 1, code: "women" },
    { name: "Mężczyźni", isSelected: false, id: 2, code: "men" },
  ]);
  const [brand, setBrands] = useState([]);

  const [state, setState] = useState({
    isLoading: false,
    sortBy: "",
    searchBySex: "",
    searchByCategory: "",
    searchByBrand: [],
    from: "",
    to: "",
  });

  const clearFiltersHandler = () => {
    setState({
      isLoading: false,
      sortBy: "",
      searchBySex: "",
      searchByCategory: "",
      searchByBrand: [],
      from: "",
      to: "",
    });

    const gen = gender;
    gen.forEach((item) => {
      item.isSelected = false;
    });
    setGender(gen);

    history.push({
      pathname: "/product",
    });
  };

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const prepareCategories = (paramCategory) => {
    let categoryData = [];
    CategoriesService.getCategories().then(
      (response) => {
        response.data.forEach((data) => {
          categoryData.push(data.typeName);
        });
        setCategory(categoryData);
      },
      (error) => {
        console.log("Error - load categories " + error);
      }
    );
  };

  const prepareBrands = () => {
    let brandData = [];
    BrandService.getBrands().then(
      (response) => {
        response.data.forEach((data) => {
          brandData.push(data.name);
        });
        setBrands(brandData);
      },
      (error) => {
        console.log("Error - load categories " + error);
      }
    );
  };

  const setUrlQuery = (prev, tmp, name) => {
    let url = window.location.search;
    if (tmp === "null" || tmp === null) {
      url = `${url
        .replace(prev, "")
        .replace(`?${name}=`, "")
        .replace(`&${name}=`, "")}`;
    } else if (url.includes(name)) {
      url = url.replaceAll(prev, tmp);
    } else {
      if (url.includes("?")) {
        url = `${url}&${name}=${tmp}`;
      } else {
        url = `${url}?${name}=${tmp}`;
      }
    }

    history.push({
      pathname: "/product",
      search: `${url}`,
    });
  };

  const handleCategoriesChange = (event) => {
    let prev = state.searchByCategory;
    let tmp = event.target.value;

    setState({
      ...state,
      searchByCategory: tmp !== "null" ? tmp : "",
    });
    setUrlQuery(prev, tmp, "category");
  };

  const handleGenderChange = (gen) => {
    let prev = state.searchBySex;
    let tmp = null;
    gen.forEach((e) => {
      if (e.isSelected) {
        tmp = e.code;
      }
    });

    setState({
      ...state,
      searchBySex: tmp,
    });
    setGender(gen);

    setUrlQuery(prev, tmp, "sex");
  };

  const handleSortChange = (e) => {
    setState({
      ...state,
      sortBy: e.target.value !== "null" ? e.target.value : "",
    });
  };

  const handleBrandChange = (event) => {
    let tmp = event.target.value;

    setState({
      ...state,
      searchByBrand: tmp !== "null" ? tmp : [],
    });
  };

  /* eslint-disable */
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const paramSex = query.get("sex");
    const paramCategory = query.get("category");

    prepareBrands();
    prepareCategories(paramCategory);

    setState({
      ...state,
      searchByCategory: paramCategory,
    });

    const gen = gender;
    gen.forEach((item) => {
      if (item.code === paramSex) {
        item.isSelected = true;
      }
    });
    setGender(gen);

    setState({
      ...state,
      searchBySex: paramSex ? paramSex : "",
      searchByCategory: paramCategory ? paramCategory : "",
    });
  }, []);

  useEffect(() => {
    ProductService.getPage(page, state).then((response) => {
      setProducts(response.data.cloths);
      setNumberOfPages(response.data.count);
      setLoading(false);
    });
  }, [
    state.searchBySex,
    state.searchByCategory,
    page,
    state.searchByBrand,
    state.from,
    state.to,
    state.sortBy,
  ]);
  /* eslint-enable */

  if (isLoading) {
    return (
      <Box className="product-list-placeholder">
        <CircularProgress variant="indeterminate" />
      </Box>
    );
  }

  const fromToHandle = (e) => {
    let value = e.target.value;
    if (e.target.value < 0) {
      value = 0;
    }

    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  return (
    <Box>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "15vw auto",
        }}
      >
        <div
          style={{
            maxWidth: "10vw",
            minWidth: "180px",
            paddingTop: "2vh",
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={clearFiltersHandler}
          >
            Wyczyść filtry
          </Button>

          <FormControl variant="outlined" fullWidth>
            <Typography variant="h6" className="item-menu">
              Sortuj po
            </Typography>
            <Divider />
            <Select value={state.sortBy} onChange={handleSortChange} fullWidth>
              <MenuItem value="null">
                <em>Brak sortowania</em>
              </MenuItem>
              <MenuItem value="nameUp">Nazwa rosnąco</MenuItem>
              <MenuItem value="nameDown">Nazwa malejąco</MenuItem>
              <MenuItem value="priceUp">Cena rosnąco</MenuItem>
              <MenuItem value="priceDown">Cena malejąco</MenuItem>
            </Select>
          </FormControl>

          <Typography variant="h6" className="item-menu">
            Cena
          </Typography>

          <ForToComponent
            to={state.to}
            from={state.from}
            fromToHandle={fromToHandle}
          />

          <Divider />
          <Typography variant="h6" className="item-menu">
            Płeć
          </Typography>
          <SingleChoiceList change={handleGenderChange} listItems={gender} />
          <Divider />
          <FormControl variant="outlined" fullWidth>
            <Typography variant="h6" className="item-menu">
              Kategorie
            </Typography>
            <Select
              value={state.searchByCategory}
              onChange={handleCategoriesChange}
              fullWidth
            >
              <MenuItem value="null">
                <em>Brak</em>
              </MenuItem>
              {category.map((cat, i) => {
                return (
                  <MenuItem key={i} value={cat.toLowerCase()}>
                    {capitalize(cat.toLowerCase())}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Divider />
          <FormControl variant="outlined" fullWidth>
            <Typography variant="h6" className="item-menu">
              Marki
            </Typography>
            <Select
              value={state.searchByBrand}
              onChange={handleBrandChange}
              multiple
              fullWidth
            >
              {brand.map((brand, i) => {
                return (
                  <MenuItem key={i} value={brand}>
                    {capitalize(brand.toLowerCase())}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <Box className="product-list-grid-container">
          {products.map((el, index) => {
            return <ProductItem {...el} key={index} />;
          })}
        </Box>
      </div>
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
