import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import App from "./App";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </QueryClientProvider>,
  document.getElementById("root")
);
