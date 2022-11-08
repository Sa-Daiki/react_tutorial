import { SquareProps } from "./type";

export const Square = ({ onClick, value }: SquareProps): JSX.Element => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
);
export default Square;
