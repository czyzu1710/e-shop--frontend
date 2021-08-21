import React, { createContext, useState } from "react";

const CartContext = createContext([new Map(), (cart) => {}]);

const TotalContext = createContext([0.0, (p) => {}]);

const CartProvider = (props) => {
  const [cart, setCart] = useState(new Map());
  const [total, setTotal] = useState(0.0);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      <TotalContext.Provider value={[total, setTotal]}>
        {props.children}
      </TotalContext.Provider>
    </CartContext.Provider>
  );
};

export { CartContext, TotalContext, CartProvider };
