import { Reducer } from "react";
import { ActionType, GameStateType } from "./type";

export const gameState: GameStateType = {
  history: [
    {
      squares: Array(9).fill(null),
    },
  ],
  stepNum: 0,
  xIsNext: true,
};

export const gameReducer: Reducer<GameStateType, ActionType> = (state, action) => {
  switch (action.type) {
    case "CLICK_BOARD":
      return {
        ...state,
        history: state.history.concat([
          {
            squares: action.payload.history[0].squares,
          },
        ]),
        stepNum: state.history.length,
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

export const clickBoard = (payload: GameStateType) => {
  return {
    type: "CLICK_BOARD",
    payload,
  };
};

export const jumpTo = (payload: GameStateType) => {
  return {
    type: "JUMP_TO",
    payload,
  };
};
