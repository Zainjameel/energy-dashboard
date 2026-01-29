import React from "react";
import ReactDOM from "react-dom/client";
import DashboardPage from "./app/DashboardPage";
import "./styles/dashboard.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DashboardPage />
  </React.StrictMode>
);

/*
Import ReactDOM (client version)

react-dom is what connects React to the browser DOM.

The /client version gives you:

createRoot() → the modern React 18 renderer

This is what actually puts your React app into the HTML page.

Without this, React would exist… but never appear on the screen.
*/

/*
Enable Strict Mode (development only)

This does NOT affect production

It helps catch:

unsafe lifecycle usage

side-effect bugs

incorrect hooks usage

In dev mode, React may:

render components twice

run effects twice

This is intentional to surface bugs early.
*/

/*
Full mental model (important)
index.html
  └── <div id="root">
        └── React App
              └── DashboardPage
                    └── Charts
                    └── Cards
                    └── D3
*/