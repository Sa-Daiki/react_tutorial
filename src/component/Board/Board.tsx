import { Square } from "../Square";
import { BoardProps } from "./type";

export const Board = ({ squares, onClick }: BoardProps): JSX.Element => {
  const Arr = Array(3).fill(null);
  return (
    <div>
      {Arr.map((_, i) => (
        <div className="board-row" key={i}>
          {Arr.map((_, subI) => (
            <Square
              value={squares[i * 3 + subI]}
              onClick={() => onClick(i * 3 + subI)}
              key={i * 3 + subI}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
export default Board;
