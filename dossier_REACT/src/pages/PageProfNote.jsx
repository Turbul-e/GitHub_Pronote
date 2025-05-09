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
    const [moyenneClasse, setMoyenneClasse] = useState(null);

    const handleValider = async () => {
        try {
            if (prof.Discipline === undefined || prof.Discipline === null) {
                alert("Erreur : Discipline non définie.");
                return;
            }

            const url = `http://localhost/GitHub_Pronote/API/bdd.php?action=eleves_annee_discipline&annee=${annee}&discipline=${prof.Discipline}`;
            console.log("URL utilisée pour la requête:", url);

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erreur HTTP ${response.status}`);
            }

            const data = await response.json();
            if (!Array.isArray(data)) {
                alert("Erreur dans la réponse API");
                return;
            }

            // Filtrage par groupe
            const filtres = groupe === "Tous"
                ? data
                : data.filter(e => String(e.Groupe) === groupe);

            setEleves(filtres);

            // Calcul de la moyenne de la classe
            let totalNotes = 0;
            let nombreNotes = 0;

            filtres.forEach(eleve => {
                Object.entries(eleve)
                    .filter(([key]) => key.startsWith("Note_"))
                    .forEach(([_, note]) => {
                        const n = parseFloat(note);
                        if (!isNaN(n)) {
                            totalNotes += n;
                            nombreNotes++;
                        }
                    });
            });

            const moyenne = nombreNotes > 0 ? (totalNotes / nombreNotes).toFixed(2) : null;
            setMoyenneClasse(moyenne);

            alert("OK");
        } catch (error) {
            alert(`Erreur de connexion: ${error.message}`);
            console.error("Erreur lors du fetch:", error);
        }
    };

    // Calcul de la moyenne d'un élève
    const calculerMoyenneEleve = (eleve) => {
        let totalNotes = 0;
        let nombreNotes = 0;

        Object.entries(eleve)
            .filter(([key]) => key.startsWith("Note_"))
            .forEach(([_, note]) => {
                const n = parseFloat(note);
                if (!isNaN(n)) {
                    totalNotes += n;
                    nombreNotes++;
                }
            });

        return nombreNotes > 0 ? (totalNotes / nombreNotes).toFixed(2) : null;
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

            {/* Encadré Classe / Groupe / Moyenne */}
            {moyenneClasse !== null && (
                <div className="encadre-moyenne">
                    <p><strong>Classe :</strong> {annee}</p>
                    <p><strong>Groupe :</strong> {groupe === "Tous" ? "Classe entière" : groupe}</p>
                    <p><strong>Moyenne :</strong> {moyenneClasse}</p>
                </div>
            )}

            {/* Affichage des élèves */}
            <div className="resultats">
                {eleves.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Notes</th>
                                <th>Moyenne</th>
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
                                    <td>{calculerMoyenneEleve(eleve)}</td>
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
