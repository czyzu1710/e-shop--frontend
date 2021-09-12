import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AuthService from "./../../services/auth";
import { CartNavButton } from "../../components/purchase/cart/CartNavButton";
import { LogInProviderContext } from "../../state/LogInProvider";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavMenu = () => {

  const history = useHistory();
  const classes = useStyles();
  const [log, setLog] = useContext(LogInProviderContext); // eslint-disable-line

  const logout = () => {
    let allCookies = document.cookie.split(";");
    for (let cookie of allCookies)
      document.cookie = cookie + "=;expires=" + new Date(0).toUTCString();
    history.push("/product" +
        "");
    history.go(0);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link
              to={"/"}
              style={{ textDecoration: "none", color: "currentcolor" }}
            >
              StudenckieUbranka
            </Link>
          </Typography>

          {(AuthService.getUser() && AuthService.getUser()["role"] === "ADMIN") ? (
            ""
          ) : (
              <Link to="/cart">
                <CartNavButton />
              </Link>
          )}

          {log || AuthService.getUser() ? (
            <Typography style={{ marginRight: "20px" }}>
              {AuthService.getUser()["role"] !== "ADMIN"
                ? AuthService.getUser()["name"]
                : "ADMIN"}
            </Typography>
          ) : (
            <Link to="/signin">
              <Button variant="outline-light" style={{ marginRight: "20px" }}>
                Zaloguj się
              </Button>
            </Link>
          )}

          {AuthService.getUser() ? (
            <Link to="/">
              <Button variant="outline-light" onClick={logout}>
                Wyloguj Się
              </Button>
            </Link>
          ) : (
            <Link to="/signup">
              <Button variant="outline-light">Zarejestruj się</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavMenu;
