import React, { useState } from "react";
import "../style/styleEnsemble.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PageConnexion = ({ typeUtilisateur, titre, redirectPath, lienMdpOublie }) => {
    const [login, setLogin] = useState("");
    const [mdp, setMdp] = useState("");
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post(
                "http://localhost/GitHub_Pronote/API/login.php",
                {
                    login,
                    mdp,
                    type: typeUtilisateur,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );

            if (response.data.success) {
                navigate(redirectPath, {
                    state: response.data[typeUtilisateur],
                });
            } else {
                setError(response.data.error);
            }
        } catch (err) {
            setError("Erreur réseau : " + err.message);
        }
    };

    return (
        <div className="accueil-container">
            <h1 className="titre">Connexion {titre}</h1>
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
                            Mot de passe oublié ? Cliquez <a href={lienMdpOublie}>ici</a>
                        </p><br />

                        <button className="bouton-login" type="submit">Se connecter</button>

                        {error && <p style={{ color: "red" }}>{error}</p>}
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default PageConnexion;
