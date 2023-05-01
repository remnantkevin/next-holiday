import "./index.css";

import { render } from "preact";

import { App } from "./app.tsx";

const el = document.getElementById("app");
if (el) {
  render(<App />, el);
}
