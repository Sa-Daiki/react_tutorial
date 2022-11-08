import { useState } from "react";
import { Board } from "src/component/Board";
import { calculateWinner } from "./calculateWinner";
import Step from "./Step";

export const Game = (): JSX.Element => {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
    },
  ]);
  const [stepNum, setStepNum] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i: number): void => {
    const _history = history.slice(0, stepNum + 1);
    const current = _history[_history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) return;
    squares[i] = xIsNext ? "X" : "O";
    setHistory((prev) =>
      prev.concat([
        {
          squares,
        },
      ])
    );
    setStepNum(history.length);
    setXIsNext((prev) => !prev);
  };

  const jumpTo = (step: number): void => {
    setStepNum(step);
    setXIsNext(step % 2 === 0);
  };

  let status: string;
  const current = history[stepNum];
  const winner = calculateWinner(current.squares);
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        {history.map((_, move) => {
          const desc = move ? "Go to move #" + move : "Go to game start";
          return <Step move={move} jumpTo={jumpTo} desc={desc} key={move} />;
        })}
      </div>
    </div>
  );
};
export default Game;
