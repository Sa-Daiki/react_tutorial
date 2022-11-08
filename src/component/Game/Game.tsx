import { useReducer } from "react";
import { Board } from "src/component/Board";
import { calculateWinner } from "./calculateWinner";
import Step from "./Step";

type GameStateType = {
  history: { squares: null[] }[];
  stepNum: number;
  xIsNext: boolean;
};

const gameState: GameStateType = {
  history: [
    {
      squares: Array(9).fill(null),
    },
  ],
  stepNum: 0,
  xIsNext: true,
};

const gameReducer = (state: any, action: any) => {
  console.log();
  switch (action.type) {
    case "CLICK_BOARD":
      return {
        ...state,
        history: state.history.concat([
          {
            squares: action.payload.squares,
          },
        ]),
        xIsNext: !state.xIsNext,
      };
    case "JUMP_TO":
      return {
        ...state,
        stepNum: action.payload.stepNum,
        xIsNext: action.payload.stepNum % 2 === 0,
      };
    default:
      throw new Error("unreachable");
  }
};

const clickBoard = (payload: any) => {
  console.log(payload);
  return {
    type: "CLICK_BOARD",
    payload,
  };
};

const jumpToBoard = (payload: any) => {
  console.log(payload);
  return {
    type: "JUMP_TO",
    payload,
  };
};

export const Game = (): JSX.Element => {
  const [state, dispatch] = useReducer(gameReducer, gameState);

  const handleClick = (i: number): void => {
    const _history = state.history.slice(0, state.stepNum + 1);
    const current = _history[_history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) return;
    squares[i] = state.xIsNext ? "X" : "O";
    dispatch(clickBoard({ squares }));
  };

  // const jumpTo = (step: number): void => {
  // setStepNum(step);
  // setXIsNext(step % 2 === 0);
  // };

  let status: string;
  const current = state.history[state.stepNum];
  const winner = calculateWinner(current.squares);
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (state.IsNext ? "X" : "O");
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
              jumpTo={(step) => dispatch(jumpToBoard({ stepNum: step }))}
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
