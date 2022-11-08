import { SquareProps } from "./type";

export const Square = ({ onClick, value }: SquareProps) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};
export default Square;
