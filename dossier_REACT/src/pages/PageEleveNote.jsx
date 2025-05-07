import React from "react";
import "../style/PageEleveNote.css";

const PageEleveNote = () => {
    return (
        <div className="accueil-container">
            <h1 className="titre"> Bienvenue sur Pronote 2.0 !</h1>
            <div className="contenu-central">
                <h2 className="sous-titre">Connexion</h2>
                <div className="boutons-groupés">
                    <button className="bouton-login">Élève</button>
                    <button className="bouton-login">Professeur·e</button>
                </div>
            </div>
        </div>
    );
};
export default PageEleveNote;