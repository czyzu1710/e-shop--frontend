import React, { useContext, useEffect, useState } from "react";
import "./OrderSummary.css";
import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import AuthService from "../../../../services/auth";
import Divider from "@material-ui/core/Divider";
import OrderData from "./OrderData";
import PersonIcon from "@material-ui/icons/Person";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import { CartContext, TotalContext } from "../../../../state/CartProvider";
import blik_img from "../../../../images/blik.png";
import inpost_img from "../../../../images/inpost.jpg";
import Form from "react-bootstrap/Form";

import ImageService from "../../../../services/images"

const OrderSummary = (props) => {
  const [total] = useContext(TotalContext);
  const [cart_products] = useContext(CartContext);
  const [userInfo, setUserInfo] = useState({
    name: "",
    street: "",
    postal: "",
    city: "",
    phone: "",
    delivery: "kurier",
    delivery_price: 20,
    pay_kind: "card",
    email: "",
  });

  const changeDeliveryPrice = (who) => {
    let delivery_p = 0.0;
    switch (who) {
      case "kurier":
        delivery_p = 20;
        break;
      case "paczkomat":
        delivery_p = 12;
        break;
      default:
        delivery_p = 0.0;
        break;
    }
    setUserInfo({ ...userInfo, delivery_price: delivery_p, delivery: who });
  };

  const handleChange = (prop) => (event) => {
    if (prop === "delivery") {
      changeDeliveryPrice(event.target.value);
    } else {
      setUserInfo({ ...userInfo, [prop]: event.target.value });
    }
  };

  useEffect(() => {
    if (AuthService.getUser()) {
      AuthService.getUserInfo(AuthService.getUser()["email"]).then(
        (result) => {
          setUserInfo({
            ...userInfo,
            name:
              result.data.userDetails.name +
              " " +
              result.data.userDetails.surname,
            street:
              result.data.userDetails.address.street +
              " " +
              result.data.userDetails.address.house_no,
            postal: result.data.userDetails.address.postal,
            city: result.data.userDetails.address.city,
            phone: result.data.userDetails.phone,
            email: result.data.email
          });
        },
        (error) => {
          console.log("User not logged " + error);
        }
      );
    }
  }, []); // eslint-disable-line

  const prepareData = (e) => {
    e.preventDefault();

    const cartData = [];
    cart_products.forEach((value, key) => {
      cartData.push(value)
    })

    const data = {
      cart: cartData,
      userInfo: userInfo,
      total: total
    }
    props.handleData(data);
    props.handleNextStep();
  }

  return (
    <div className="order">
      <Form className="order-container" onSubmit={prepareData}>
        <div className="order-info">
          <Typography variant="h6">Dane odbiorcy przesyki</Typography>
          <Typography variant="subtitle2" style={{ paddingBottom: "5px" }}>
            Na ten adres zostanie wysłana Twoja przesyłka.
          </Typography>

          {AuthService.getUser() ? (
            <>
              <Typography>{userInfo.name ? userInfo.name : ""}</Typography>
              <Typography>{userInfo.street ? userInfo.street : ""}</Typography>
              <Typography>
                {userInfo.postal ? userInfo.postal + " " + userInfo.city : ""}
              </Typography>
              <Typography>{userInfo.phone ? userInfo.phone : ""}</Typography>
            </>
          ) : (
            <>
              <OrderData handleChange={handleChange} values={userInfo} />
            </>
          )}

          <Typography variant="h6" style={{ paddingTop: "25px" }}>
            Sposób dostawy
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="delivery"
              name="delivery"
              value={userInfo.delivery}
              onChange={handleChange("delivery")}
            >
              <List className="order-list">
                <ListItem>
                  <ListItemText>
                    <FormControlLabel
                      value="kurier"
                      control={<Radio />}
                      label="Kurier"
                    />
                  </ListItemText>
                  <ListItemIcon edge="end">
                    <LocalShippingIcon />
                  </ListItemIcon>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText>
                    <FormControlLabel
                      value="paczkomat"
                      control={<Radio />}
                      label="Paczkomat"
                    />
                  </ListItemText>
                  <ListItemIcon edge="end">
                    <img src={inpost_img} alt="inpost" height="62px" />
                  </ListItemIcon>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText>
                    <FormControlLabel
                      value="osobisty"
                      control={<Radio />}
                      label="Odbiór osobisty"
                    />
                  </ListItemText>
                  <ListItemIcon edge="end">
                    <PersonIcon />
                  </ListItemIcon>
                </ListItem>
              </List>
            </RadioGroup>
          </FormControl>

          <Typography variant="h6" style={{ paddingTop: "25px" }}>
            Metoda płatności
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="pay_kind"
              name="pay_kind"
              value={userInfo.pay_kind}
              onChange={handleChange("pay_kind")}
            >
              <List className="order-list">
                <ListItem>
                  <ListItemText>
                    <FormControlLabel
                      value="card"
                      control={<Radio />}
                      label="Karta"
                    />
                  </ListItemText>
                  <ListItemIcon edge="end">
                    <CreditCardIcon />
                  </ListItemIcon>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText>
                    <FormControlLabel
                      value="blik"
                      control={<Radio />}
                      label="Blik"
                    />
                  </ListItemText>
                  <ListItemIcon edge="end">
                    <img src={blik_img} alt="blik" height="22px" />
                  </ListItemIcon>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText>
                    <FormControlLabel
                      value="tansfer"
                      control={<Radio />}
                      label="Przelew"
                    />
                  </ListItemText>
                  <ListItemIcon edge="end">
                    <AccountBalanceIcon />
                  </ListItemIcon>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText>
                    <FormControlLabel
                      value="self"
                      control={<Radio />}
                      label="Przy odbiorze"
                    />
                  </ListItemText>
                  <ListItemIcon edge="end">
                    <AccountBalanceWalletIcon />
                  </ListItemIcon>
                </ListItem>
              </List>
            </RadioGroup>
          </FormControl>
        </div>
        <div className="order-pay">
          <div id="sticky-el">
            <List>
              {Array.from(cart_products).map(([key, value], index) => (
                <ListItem key={index}>
                  <ListItemIcon style={{marginRight: "20px"}}>
                    <img src={ImageService.getImageWithSpecifiedSize(value.imagesUrls[0], 80, 100)} alt={ImageService.getImageAlt(value.id, value.imagesUrls[0])}/>
                  </ListItemIcon>
                  <ListItemText
                    primary={value.name}
                    secondary={`Rozmiar: ${value.size}`}
                  />
                  <ListItemIcon edge="end" style={{marginLeft: "20px"}}>
                    {value.quantity} x {value.price}
                  </ListItemIcon>
                </ListItem>
              ))}
            </List>
            <Divider />
            <Typography variant="h6">Podsumowanie</Typography>

            <div className="order-pay-info">
              <span>
                <Typography variant="subtitle1" style={{ paddingTop: "7px" }}>
                  Wartość przedmiotów
                </Typography>
                <Typography
                  variant="subtitle1"
                  style={{ paddingBottom: "7px" }}
                >
                  Dostawa
                </Typography>
              </span>
              <span className="order-pay-info-price">
                <Typography variant="subtitle2" style={{ paddingTop: "7px" }}>
                  {total ? total.toFixed(2) + "zł" : "0zł"}
                </Typography>
                <Typography
                  variant="subtitle2"
                  style={{ paddingBottom: "7px" }}
                >
                  {userInfo.delivery_price
                    ? userInfo.delivery_price + "zł"
                    : "0zł"}
                </Typography>
              </span>
            </div>
            <Divider />
            <div className="main-price">
              <Typography
                variant="subtitle1"
                style={{
                  fontSize: "18px",
                  paddingTop: "7px",
                  paddingBottom: "7px",
                }}
              >
                <span style={{ textTransform: "uppercase" }}>Do zapłaty</span>{" "}
                <span style={{ fontSize: "24px" }}>
                  {total
                    ? parseFloat(+total + userInfo.delivery_price).toFixed(2) +
                      "zł"
                    : "0zł"}
                </span>
              </Typography>
            </div>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              size="large"
              style={{ minHeight: "50px", width: "360px" }}
            >
              <span className="btn-login-txt">
                <Typography variant="h6">Kupuję i płacę</Typography>
              </span>
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default OrderSummary;
