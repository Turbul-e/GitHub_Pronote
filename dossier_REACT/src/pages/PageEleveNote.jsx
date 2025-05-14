import React from "react";
import { useLocation } from "react-router-dom";
import "../style/PageAccueil.css";

const PageEleveNote = () => {
  const location = useLocation();
  const eleve = location.state;

  return (
    <div className="accueil-container">
      <h1 className="titre">Fiche élève</h1>

      {eleve ? (
        <div className="fiche-notes-container">
          {/* Partie infos élève */}
          <div className="fiche-eleve encadre-moyenne">
            <p>
              <strong>Nom :</strong> {eleve.Nom}
            </p>
            <p>
              <strong>Prénom :</strong> {eleve.Prenom}
            </p>
            <p>
              <strong>Catégorie :</strong> {eleve.Categorie}
            </p>
            <p>
              <strong>Année :</strong> {eleve.Annee}
            </p>
            <p>
              <strong>Groupe :</strong> {eleve.Groupe}
            </p>
          </div>

          {/* Partie notes */}
          <div className="bloc-notes encadre-moyenne">
            <h2 className="sous-titre">Notes</h2>
            <ul className="liste-notes">
              {Object.keys(eleve)
                .filter((key) => key.startsWith("Note"))
                .map((key) => (
                  <li key={key} className="note-ligne">
                    <span className="note-cle">{key} :</span>{" "}
                    <span className="note-valeur">{eleve[key]}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="texte-erreur">Aucune donnée reçue</p>
      )}
    </div>
  );
};

export default PageEleveNote;
