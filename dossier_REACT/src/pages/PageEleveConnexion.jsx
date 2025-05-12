import React, { useState } from "react";
import "../style/PageAccueil.css";
import { NavLink, useNavigate } from "react-router";
import axios from "axios";

export default function PageEleveConnexion() {
    const [login, setLogin] = useState("");
    const [mdp, setMdp] = useState("");
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post("http://localhost/GitHub_Pronote/API/login.php", {
                login,
                mdp,
                type: "eleve",
            });

            if (response.data.success) {
                // redirection vers la page de l'élève avec ses infos
                navigate("/ConnexionEleve/EleveNote", { state: response.data.eleve });
            } else {
                setError(response.data.error);
            }
        } catch (err) {
            setError("Erreur réseau : " + err.message);
        }
    };

    return (
        <div className="accueil-container">
            <h1 className="titre">Connexion Élève</h1>
            <div className="contenu-login">
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Login</legend>

                        <label>Identifiant</label><br />
                        <input
                            type="text"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                        /><br />

                        <label>Mot de passe</label><br />
                        <div style={{ position: "relative" }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={mdp}
                                onChange={(e) => setMdp(e.target.value)}
                                required
                                style={{ paddingRight: "30px" }}
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: "absolute",
                                    right: "8px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    cursor: "pointer"
                                }}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </span>
                        </div>

                        <p>
                            Login ou mot de passe oublié ? Cliquez <NavLink to={"/ConnexionEleve/OubliMdp"}>ici</NavLink>
                        </p><br />

                        <button className="bouton-login" type="submit">Se connecter</button>

                        {error && <p style={{ color: "red" }}>{error}</p>}
                    </fieldset>
                </form>
            </div>
        </div>
    );
}
