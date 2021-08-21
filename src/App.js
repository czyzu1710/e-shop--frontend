import { Route, Switch } from "react-router-dom";
import Signin from "./components/authorization/Signin";
import Signup from "./components/authorization/Signup";
import Home from "./components/Home/Home";
import NavMenu from "./common/Nav/NavMenu";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { ProductsPage } from "./components/products/ProductsPage";
import { ProductPage } from "./components/product/ProductPage";
import NotFound from "./common/ErrorPages/NotFound";
import { CartProvider } from "./state/CartProvider";
import AddProducts from "./components/admin/AddProducts";
import OrderSummary from "./components/purchase/order/summary/OrderSummary";
import { PurchaseSteps } from "./components/purchase/PurchaseSteps";
import "./App.css";
import { LogInProvider } from "./state/LogInProvider";

function App() {
  return (
    <div className="app-main-container">
      <LogInProvider>
        <CartProvider>
          <NavMenu />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signin" exact component={Signin} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/product" exact component={ProductsPage} />
            <Route path="/product/:id" exact component={ProductPage} />
            <Route path="/cart" exact component={PurchaseSteps} />
            <Route path="/summary" exact component={OrderSummary} />

            {/*admin routes*/}
            <Route path="/admin/add" exact component={AddProducts} />

            <Route component={NotFound} />
          </Switch>
        </CartProvider>
      </LogInProvider>
    </div>
  );
}

export default App;
