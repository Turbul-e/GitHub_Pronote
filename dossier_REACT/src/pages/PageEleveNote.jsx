import React from 'react';
import { useLocation } from 'react-router-dom';

const PageEleveNote = () => {
    const location = useLocation();
    const eleve = location.state;

    return (
        <div>
            <h1>Informations de l'élève</h1>
            {eleve ? (
                <div>
                    <p><strong>Nom :</strong> {eleve.Nom}</p>
                    <p><strong>Prénom :</strong> {eleve.Prenom}</p>
                    <p><strong>Catégorie :</strong> {eleve.Categorie}</p>
                    <p><strong>Année :</strong> {eleve["Année"]}</p>
                    <p><strong>Groupe :</strong> {eleve.Groupe}</p>
                    <h2>Notes</h2>
                    <ul>
                        {Object.keys(eleve).filter(key => key.startsWith("Note")).map(key => (
                            <li key={key}>
                                {key} : {eleve[key]}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Aucune donnée reçue</p>
            )}
        </div>
    );
};

export default PageEleveNote;
