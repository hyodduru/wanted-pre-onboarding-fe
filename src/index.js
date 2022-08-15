import React from "react";
import ReactDOM from "react-dom/client";
import { theme } from "./styles/theme";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";

import Router from "./Router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <GlobalStyle />
      <Router />
    </React.StrictMode>
  </ThemeProvider>
);
