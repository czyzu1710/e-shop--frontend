import "./Admin.css";
import React, { useEffect, useState } from "react";
import BrandService from "../../services/brand";
import CategoriesService from "../../services/categories";
import { DropzoneAreaBase } from "material-ui-dropzone";
import {
  Select,
  MenuItem,
  TextField,
  Typography,
  Box,
  Button,
  Divider,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl,
  Grid,
  Switch,
} from "@material-ui/core";
import Form from "react-bootstrap/Form";
import ProductService from "./../../services/product";
import { useSnackbar } from "notistack";

const AddProducts = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar(); // eslint-disable-line
  const [available_sizes, setSizes] = useState({
    S: true,
    M: true,
    L: true,
    XL: true,
    XS: true,
  });
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [files, setFiles] = useState([]);
  const [newCat, setNewCat] = React.useState("");
  const [newBrand, setNewBrand] = React.useState("");

  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
    brand: "",
    sizes: [],
    category_name: "",
    quantity: 0,
    for: false,
  });

  useEffect(() => {
    let brandData = [];
    BrandService.getBrands().then(
      (response) => {
        response.data.forEach((data) => {
          brandData.push(data.name);
        });
        setBrands(brandData);
      },
      (error) => {
        console.log("Error - load brands " + error);
      }
    );

    let categoryData = [];
    CategoriesService.getCategories().then(
      (response) => {
        response.data.forEach((data) => {
          categoryData.push(data.typeName);
        });
        setCategories(categoryData);
      },
      (error) => {
        console.log("Error - load categories " + error);
      }
    );
  }, []);

  const handleAdd = (newFiles) => {
    newFiles = newFiles.filter(
      (file) => !files.find((f) => f.data === file.data)
    );
    setFiles([...files, ...newFiles]);
  };

  const handleDelete = (deleted) => {
    setFiles(files.filter((f) => f !== deleted));
  };

  const clearCustomProduct = () => {
    setNewCat("");
  };

  const clearCustomBrand = () => {
    setNewBrand("");
  };

  const handleChange = (prop) => (event) => {
    setProduct({
      ...product,
      [prop]: event.target.value,
    });

    if (prop === "category_name") {
      clearCustomProduct();
    }
    if (prop === "brand") {
      clearCustomBrand();
    }
  };

  const updateState = (val, name) => {
    setProduct({
      ...product,
      [name]: val,
    });
  };

  const handleChangeMenuCat = (e) => {
    setNewCat(e.target.value);
    updateState(e.target.value, "category_name");
  };

  const handleChangeMenuBrand = (e) => {
    setNewBrand(e.target.value);
    updateState(e.target.value, "brand");
  };

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const stopImmediatePropagation = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleSizesState = () => {
    let avSizes = [];
    Object.entries(available_sizes).forEach(([key, value]) => {
      if (value) {
        avSizes.push(key);
      }
    });

    setProduct({
      ...product,
      sizes: avSizes,
    });
  };

  const handleChangeCheckBox = (event) => {
    setSizes({ ...available_sizes, [event.target.name]: event.target.checked });
    handleSizesState();
  };

  const handleSex = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.checked });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    let test = false,
      testImage = false;

    Object.entries(available_sizes).forEach(([key, value]) => {
      if (value) {
        test = true;
      }
    });

    if (files.length >= 2) {
      testImage = true;
    }

    if (test && testImage) {
      ProductService.addProduct(
        product,
        files,
        newCat,
        newBrand,
        available_sizes,
        categories,
        brands
      ).then(
        () => {
          enqueueSnackbar("Dodano produkt", { variant: "success" });
          window.location.reload();
        },
        (error) => {
          console.log("Add error " + error);
        }
      );
    } else {
      let message = "";
      if (!testImage && !test) {
        message =
          "Należy dodać min 2 zdjęcia i ustawić min jeden dostępny rozmiar";
      } else if (!testImage) {
        message = "Należy dodać min 2 zdjęcia";
      } else if (!test) {
        message = "Należy ustawić min 1 dostępny rozmiar";
      }

      enqueueSnackbar(message, { variant: "error" });
    }
  };

  return (
    <div className="admin">
      <Form className="admin-container" onSubmit={handleAddSubmit}>
        <Typography
          variant="h6"
          className="item-menu"
          style={{ textAlign: "center" }}
        >
          Dodanie nowego produktu
        </Typography>
        <div className="center-component">
          <Box m={3} className="left-component">
            <DropzoneAreaBase
              acceptedFiles={["image/*"]}
              dropzoneText={"Przeciągnij lub kliknij aby dodać zdjęcia"}
              filesLimit={4}
              fileObjects={files}
              onAdd={handleAdd}
              onDelete={handleDelete}
              fullWidth
              showAlerts={false}
            />
            <TextField
              name="name"
              type="text"
              label="Nazwa"
              variant="outlined"
              value={product.name}
              onChange={handleChange("name")}
              required
              margin="normal"
              fullWidth
            />
            <TextField
              name="description"
              type="text"
              label="Opis"
              variant="outlined"
              margin="normal"
              value={product.description}
              onChange={handleChange("description")}
              fullWidth
            />
            <TextField
              name="price"
              type="number"
              label="Cena"
              variant="outlined"
              margin="normal"
              value={product.price}
              onChange={handleChange("price")}
              inputProps={{ min: 0 }}
              fullWidth
              required
            />
            <TextField
              name="quantity"
              type="number"
              label="Ilość poduktu"
              variant="outlined"
              margin="normal"
              value={product.quantity}
              onChange={handleChange("quantity")}
              inputProps={{ min: 0 }}
              fullWidth
              required
            />
          </Box>
          <Box m={3} className="right-component">
            <FormControl variant="outlined" fullWidth>
              <Typography variant="h6" className="item-menu">
                Marka
              </Typography>
              <Select
                value={product.brand}
                onChange={handleChange("brand")}
                fullWidth
                required
              >
                <MenuItem value="">Brak</MenuItem>
                {brands
                  ? brands.map((brand, i) => {
                      return (
                        <MenuItem key={i} value={brand}>
                          {capitalize(brand.toLowerCase())}
                        </MenuItem>
                      );
                    })
                  : ""}
                <MenuItem value={newBrand}>
                  <TextField
                    name="newBrand"
                    type="text"
                    label="Nowa marka"
                    variant="outlined"
                    fullWidth
                    value={newBrand}
                    onChange={handleChangeMenuBrand}
                    onClickCapture={stopImmediatePropagation}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="outlined" fullWidth>
              <Typography variant="h6" className="item-menu">
                Kategoria
              </Typography>
              <Select
                value={product.category_name}
                onChange={handleChange("category_name")}
                fullWidth
                required
              >
                <MenuItem value="">Brak</MenuItem>
                {categories
                  ? categories.map((category, i) => {
                      return (
                        <MenuItem key={i} value={category}>
                          {capitalize(category.toLowerCase())}
                        </MenuItem>
                      );
                    })
                  : ""}
                <MenuItem value={newCat}>
                  <TextField
                    name="newCat"
                    type="text"
                    label="Nowa kategoria"
                    variant="outlined"
                    fullWidth
                    value={newCat}
                    onChange={handleChangeMenuCat}
                    onClickCapture={stopImmediatePropagation}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                </MenuItem>
              </Select>
            </FormControl>
            <Typography variant="h6" className="item-menu">
              Dostępne rozmiary
            </Typography>
            <FormControl component="fieldset">
              <FormGroup>
                {Object.entries(available_sizes).map(([key, value], index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          checked={value}
                          onChange={handleChangeCheckBox}
                          name={key}
                        />
                      }
                      label={key}
                    />
                  );
                })}
              </FormGroup>
            </FormControl>

            <Typography variant="h6" className="item-menu">
              Dla:
            </Typography>
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>Mężczyźni</Grid>
                <Grid item>
                  <Switch
                    checked={product.for}
                    onChange={handleSex}
                    name="for"
                  />
                </Grid>
                <Grid item>Kobiety</Grid>
              </Grid>
            </Typography>
          </Box>
        </div>
        <div>
          <Divider />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            size="large"
            style={{ minHeight: "50px" }}
            fullWidth
          >
            <span className="btn-login-txt">Dodaj produkt</span>
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddProducts;
