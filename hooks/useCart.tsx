"use client";
import { CardProductProps } from "@/app/components/detail/DetailClient";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

interface CartContextProps {
  productCartQty: number;
  cartProducts: CardProductProps[] | null;
  addToBasket: (product: CardProductProps) => void;
  addToBasketIncrease: (product: CardProductProps) => void;
  addToBasketDecrease: (product: CardProductProps) => void;
  removeFromCart: (product: CardProductProps) => void;
  removeCart: () => void;
}

const CartContext = createContext<CartContextProps | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [productCartQty, setProductsCartQty] = useState(0);
  const [cartProducts, setCartProducts] = useState<CardProductProps[] | null>(
    null
  );

  useEffect(() => {
    let getItem: any = localStorage.getItem("cart");
    let getItemParse: CardProductProps[] = JSON.parse(getItem);
    setCartProducts(getItemParse);
  }, []);

  const addToBasketIncrease = useCallback((product: CardProductProps) => {
    let updatedCart;
    if(product.quantity == 10){
      return toast.error('Maximum product limit reached. You can only add up to 10 items.')
    }
    if(cartProducts){
      updatedCart = [...cartProducts]
      const existingItem = cartProducts.findIndex(item => item.id === product.id)

      if(existingItem > -1){
        updatedCart[existingItem].quantity +=1
      }
      setCartProducts(updatedCart)
      localStorage.setItem('cart', JSON.stringify(updatedCart))
    }

  }, [cartProducts])

  const addToBasketDecrease = useCallback((product: CardProductProps) => {
    let updatedCart;
    if(product.quantity == 1){
      return toast.error('Minimum product limit reached. You must add at least 1 item.')
    }
    if(cartProducts){
      updatedCart = [...cartProducts]
      const existingItem = cartProducts.findIndex(item => item.id === product.id)

      if(existingItem > -1){
        updatedCart[existingItem].quantity -=1
      }
      setCartProducts(updatedCart)
      localStorage.setItem('cart', JSON.stringify(updatedCart))
    }

  }, [cartProducts])

  const removeCart = useCallback(() => {
    setCartProducts(null);
    toast.success("Cart Cleared Successfully!");
    localStorage.setItem("cart", JSON.stringify(null));
  }, []);

  const addToBasket = useCallback(
    (product: CardProductProps) => {
      setCartProducts((prev) => {
        let updatedCart;
        if (prev) {
          updatedCart = [...prev, product];
        } else {
          updatedCart = [product];
        }
        toast.success("Added Product to Cart!");
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      });
    },
    [cartProducts]
  );

  const removeFromCart = useCallback(
    (product: CardProductProps) => {
      if (cartProducts) {
        const filteredProducts = cartProducts.filter(
          (cart) => cart.id !== product.id
        );

        setCartProducts(filteredProducts);
        toast.success("Deleted Product from Cart!");
        localStorage.setItem("cart", JSON.stringify(filteredProducts));
      }
    },
    [cartProducts]
  );

  let value = {
    productCartQty,
    addToBasket,
    cartProducts,
    removeFromCart,
    removeCart,
    addToBasketIncrease,
    addToBasketDecrease
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
