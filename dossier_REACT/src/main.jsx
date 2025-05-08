import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import PageEleveConnexion from "./pages/PageEleveConnexion";
import PageEleveNote from "./pages/PageEleveNote";
import PageProfConnexion from "./pages/PageProfConnexion";
import PageProfNote from "./pages/PageProfNote";

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
    path: "ConnexionEleve/EleveNote",
    element: <PageEleveNote />
  },
  {
    path: "ConnexionProf",
    element: <PageProfConnexion />
  },
  {
    path: "ConnexionProf/ProfNote",
    element: <PageProfNote />
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