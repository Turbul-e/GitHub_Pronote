import React from "react";
import "../style/PageAccueil.css";
import { NavLink } from "react-router";

const PageAccueil = () => {
    return (
        <div className="accueil-container">
            <NavLink to={"test"} >Lien vers test</NavLink>
            <h1 className="titre"> Bienvenue sur Pronote 2.0 !</h1>
            <div className="contenu-central">
                <h2 className="sous-titre">Connexion</h2>
                <div className="boutons-groupés">
                    <button className="bouton-login">
                        <NavLink to={"ConnexionEleve"}>Élève</NavLink>
                    </button>
                    <button className="bouton-login">Professeur·e</button>
                </div>
            </div>
        </div>
    );
};
export default PageAccueil;