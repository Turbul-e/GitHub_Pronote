import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import PageEleveConnexion from "./pages/PageEleveConnexion";
import PageEleveNote from "./pages/PageEleveNote";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "ConnexionEleve",
    element: <PageEleveConnexion />
  },
  {
    path: "EleveNote",
    element: <PageEleveNote />
  },
  {
    path: "/ConnexionEleve/OubliMdp",
    element: <div className="accueil-container">
      <h2>
        Too bad :/
      </h2>
    </div>
  }
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />
);