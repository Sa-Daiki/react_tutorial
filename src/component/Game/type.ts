export type StepProps = {
  move: number;
  desc: string;
  jumpTo: (step: number) => void;
};

export type SquareType = Array<null | "X" | "O">;

export type GameStateType = {
  history: { squares: SquareType }[];
  stepNum: number;
  xIsNext: boolean;
};

export type ActionType = {
  type: string;
  payload: GameStateType;
};
