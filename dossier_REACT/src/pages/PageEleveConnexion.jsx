import React from "react";
import "../style/PageEleveConnexion.css";
import { NavLink } from "react-router";

const PageEleveConnexion = () => {
    return (
        <div className="accueil-container">
            <h1 className="titre"> Connexion Élève </h1>
            <div className="contenu-login">
                <form action="URL" method="post">
                    <fieldset>
                        <legend>
                            Login
                        </legend>
                        <label>
                            Identifiant
                        </label> <br />
                        <input value="en vrai mettez rien svp, ça marche pas encore" /><br />
                        <label>
                            Mot de passe
                        </label> <br />
                        <input value="en vrai mettez rien svp, ça marche pas encore" /> <br />
                        <p>
                            Login ou mot de passe oublié ? Cliquez <NavLink to={"OubliMdp"}>ici</NavLink>
                        </p> <br />
                        <button className="bouton-login"> <NavLink to={"EleveNote"}> Se connecter </NavLink> </button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};
export default PageEleveConnexion;