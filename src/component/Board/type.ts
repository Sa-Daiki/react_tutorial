export type BoardProps = {
  squares: Array<"X" | "O" | null>;
  onClick: (param: number) => void;
};
