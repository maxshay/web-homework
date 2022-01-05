import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./AppRouter.jsx";
import { ApolloProvider } from "@apollo/client";
import { client } from "./network/apollo-client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { AddModal } from "./components";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AppRouter />
      <AddModal />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (undefined /* [snowpack] import.meta.hot */) {
  undefined /* [snowpack] import.meta.hot */
    .accept();
}
