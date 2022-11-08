import { SquareProps } from "./type";

export const Square = ({ onClick, value }: SquareProps) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
);
export default Square;
