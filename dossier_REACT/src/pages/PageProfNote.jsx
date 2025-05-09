import React, { useState } from "react";
import "../style/PageAccueil.css";
import { useLocation } from "react-router-dom";

// Component Dropdown
const Dropdown = ({ trigger, menu }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="dropdown" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            {trigger}
            {open && (
                <ul className="menu">
                    {menu.map((item, i) => (
                        <li key={i} className="menu-item">{item}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const PageProfNote = () => {
    const location = useLocation();
    const prof = location.state;

    const [annee, setAnnee] = useState("1A");
    const [groupe, setGroupe] = useState("Tous");
    const [eleves, setEleves] = useState([]);

    const handleValider = async () => {
        try {
            // Vérifier si prof.Discipline est bien défini
            if (prof.Discipline === undefined || prof.Discipline === null) {
                alert("Erreur : Discipline non définie.");
                return;
            }

            // Construire l'URL
            const url = `http://localhost/GItHub_Pronote/API/bdd.php?action=eleves_annee_discipline&annee=${annee}&discipline=${prof.Discipline}`;

            // Afficher l'URL dans la console pour déboguer
            console.log("URL utilisée pour la requête:", url);

            // Envoyer la requête
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Erreur HTTP ${response.status}`);
            }

            const data = await response.json();

            // Vérification et mise à jour du state
            if (Array.isArray(data)) {
                setEleves(data);
                alert("OK");
            } else {
                alert("Erreur dans la réponse API");
                console.error("Réponse inattendue:", data);
            }
        } catch (error) {
            // Affichage de l'erreur dans l'alerte
            alert(`Erreur de connexion: ${error.message}\nURL: http://localhost/PronoteAPI/bdd.php?action=eleves_annee_discipline&annee=${annee}&discipline=${prof.Discipline}`);
            console.error("Erreur lors du fetch:", error);
        }
    };




    return (
        <div className="accueil-container">
            <h1 className="titre">{prof.Prenom} {prof.Nom}</h1>
            <h2 className="sous-titre">Voyez ici les notes que vous avez données.</h2>

            <div className="boutons-groupés">
                <Dropdown
                    trigger={<button className="dropdown">{">"} {annee}</button>}
                    menu={[
                        <button onClick={() => setAnnee("1A")}>Première année</button>,
                        <button onClick={() => setAnnee("2A")}>Deuxième année</button>,
                        <button onClick={() => setAnnee("3A")}>Troisième année</button>
                    ]}
                />
                <Dropdown
                    trigger={<button className="dropdown">{">"} {groupe === "Tous" ? "Tous les élèves" : `Groupe TD${groupe}`}</button>}
                    menu={[
                        <button onClick={() => setGroupe("Tous")}>Tous les élèves</button>,
                        <button onClick={() => setGroupe("1")}>Gr TD1</button>,
                        <button onClick={() => setGroupe("2")}>Gr TD2</button>,
                        <button onClick={() => setGroupe("3")}>Gr TD3</button>,
                        <button onClick={() => setGroupe("4")}>Gr TD4</button>
                    ]}
                />
                <button className="bouton-simple" onClick={handleValider}>Valider</button>
            </div>

            {/* Affichage des élèves */}
            <div className="resultats">
                {eleves.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {eleves.map((eleve, index) => (
                                <tr key={index}>
                                    <td>{eleve.Nom}</td>
                                    <td>{eleve.Prenom}</td>
                                    <td>
                                        {Object.entries(eleve)
                                            .filter(([cle]) => cle.startsWith("Note_"))
                                            .map(([cle, val]) => (
                                                <span key={cle}>{val} </span>
                                            ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Aucun élève affiché. Cliquez sur "Valider".</p>
                )}
            </div>
        </div>
    );
};

export default PageProfNote;
