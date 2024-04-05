"use client";
import { CardProductProps } from "@/app/components/detail/DetailClient";
import { createContext, useCallback, useContext, useState } from "react";

interface CartContextProps {
  productCartQty: number;
  cartProducts: CardProductProps[] | null
  addToBasket: (product: CardProductProps ) => void
}

const CartContext = createContext<CartContextProps | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [productCartQty, setProductsCartQty] = useState(0);
  const [cartProducts, setCartProducts] = useState<CardProductProps[] | null>(null);

  const addToBasket = useCallback((product: CardProductProps) => {
    setCartProducts(prev => {
        let updatedCart;
        if(prev){
            updatedCart = [...prev, product]
        }else{
            updatedCart = [product]
        }
        return updatedCart
    })
  }, [cartProducts])

  let value = {
    productCartQty,
    addToBasket,
    cartProducts
  };

  return <CartContext.Provider value={value} {...props} />;
};

const UseCart = () => {
  const context = useContext(CartContext);
  if (context == null) {
    throw new Error("There is an error.");
  }
  return context;
};

export default UseCart;
