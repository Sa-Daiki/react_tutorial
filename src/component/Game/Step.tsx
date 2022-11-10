import { StepProps } from "./type";

const Step = ({ move, jumpTo, desc }: StepProps): JSX.Element => {
  return (
    <li key={move}>
      <button onClick={() => jumpTo(move)}>{desc}</button>
    </li>
  );
};

export default Step;
