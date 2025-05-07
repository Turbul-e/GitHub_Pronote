import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import PageEleveConnexion from "./pages/PageEleveConnexion";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "test",
    element: <div>Heloo World</div>
  },
  {
    path: "ConnexionEleve",
    element: <PageEleveConnexion />
  }
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />
);