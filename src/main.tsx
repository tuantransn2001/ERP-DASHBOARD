import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import "Assets/styles/tailwind.css";
import "Assets/styles/index.css";
import { ThemeProvider } from "@material-tailwind/react";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
