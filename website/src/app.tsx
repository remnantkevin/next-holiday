import "./app.css";

import { useState } from "preact/hooks";

import viteLogo from "/vite.svg";

import preactLogo from "./assets/preact.svg";

export function App() {
  const [count, setCount] = useState(0);
  const [country, setCountry] = useState(undefined);
  const [subdivision, setSubdivision] = useState(undefined);

  async function getLocationData() {
    const location = await fetch("/location").then((r) => r.json());
    const holiday = await fetch(
      `/.netlify/functions/holidays?countryCode=${location.countryCode}&subdivisionCode=${location.subdivisionCode}`
    ).then((r) => r.json());

    setCountry(holiday.countryCode);
    setSubdivision(holiday.subdivisionCode);
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://preactjs.com" target="_blank" rel="noreferrer">
          <img src={preactLogo} className="logo preact" alt="Preact logo" />
        </a>
      </div>
      <h1>Vite + Preact</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <button
          onClick={() => {
            void getLocationData();
          }}
        >
          Get location
        </button>
        <p>Country: {country ?? "None"}</p>
        <p>Subdivision: {subdivision ?? "None"}</p>
      </div>
    </>
  );
}
