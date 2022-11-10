import { useReducer } from "react";
import { Board } from "src/component/Board";
import { calculateWinner } from "./calculateWinner";
import { clickBoard, gameReducer, gameState, jumpTo } from "./gameReducer";
import Step from "./Step";

export const Game = (): JSX.Element => {
  const [state, dispatch] = useReducer(gameReducer, gameState);

  const handleClick = (i: number): void => {
    const _history = state.history.slice(0, state.stepNum + 1);
    const current = _history[_history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) return;
    squares[i] = state.xIsNext ? "X" : "O";
    dispatch(clickBoard({ ...state, history: [{ squares: squares }] }));
  };

  let status: string;
  const current = state.history[state.stepNum];
  const winner = calculateWinner(current.squares);
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (state.xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        {state.history.map((_: any, move: number) => {
          const desc = move ? "Go to move #" + move : "Go to game start";
          return (
            <Step
              move={move}
              jumpTo={(step) => dispatch(jumpTo({ ...state, stepNum: step }))}
              desc={desc}
              key={move}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Game;
