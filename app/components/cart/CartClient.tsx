"use client";
import UseCart from "@/hooks/useCart";
import PageContainer from "../containers/PageContainer";
import Image from "next/image";
import Button from "../general/Button";

const CartClient = () => {
  const { cartProducts, removeFromCart, removeCart} = UseCart();

  console.log(cartProducts);

  if (!cartProducts || cartProducts.length == 0) {
    return <div>There are no products in your cart..</div>;
  }

  return (
    <div className="my-3 md:my-10">
      <PageContainer>
        <div className="flex items-center gap-3 text-center border-b py-3">
          <div className="w-1/5">Product Image</div>
          <div className="w-1/5">Product Name</div>
          <div className="w-1/5">Product Count</div>
          <div className="w-1/5">Product Price</div>
          <div className="w-1/5"></div>
        </div>

        <div>
          {cartProducts.map((cart) => (
            <div className="flex items-center justify-between text-center my-5" key={cart.id}>
              <div className="w-1/5 flex items-center justify-center">
                <Image src={cart.image} width={40} height={40} alt="" />
              </div>
              <div className="w-1/5">{cart.name}</div>
              <div className="w-1/5">2</div>
              <div className="w-1/5 text-orange-600 text-lg">${cart.price}</div>
              <div className="w-1/5">
                <Button color="red" text="Delete" onClick={() => removeFromCart(cart)} />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between my-5 py-5 border-t">
            <button onClick={() => removeCart()} className="w-1/5 underline text-sm">Clear Cart</button>
            <div className="text-lg md:text-2xl text-orange-600 font-bold">$1000</div>
        </div>

        
      </PageContainer>
    </div>
  );
};

export default CartClient;
