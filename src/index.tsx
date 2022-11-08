import ReactDOM from "react-dom/client";
import { Game } from "./component/Game";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<Game />);
