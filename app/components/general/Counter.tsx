import { CardProductProps } from "../detail/DetailClient";

interface CounterProps {
  cardProduct: CardProductProps;
  increaseFunc: () => void;
  decreaseFunc: () => void;
}

const Counter: React.FC<CounterProps> = ({ cardProduct, increaseFunc, decreaseFunc }) => {
    
    const buttonStyle = "w-8 h-8 border flex items-center justify-center text-lg rounded-md cursor-pointer hover:bg-slate-200 transition duration-75 "
  return (
    <div className="flex items-center gap-3">
      <div className={buttonStyle} onClick={decreaseFunc}>-</div>
      <div className="text-lg md:text-xl">{cardProduct?.quantity}</div>
      <div className={buttonStyle} onClick={increaseFunc}>+</div>
    </div>
  );
};

export default Counter;
