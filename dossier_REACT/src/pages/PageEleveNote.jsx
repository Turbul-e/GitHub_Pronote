import "../style/PageAccueil.css";
import React, { useEffect, useState } from 'react';

function Eleves() {
    const [eleves, setEleves] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost/ton_dossier_php/ton_script.php?page=Eleves')
            .then(response => {
                if (response.data.error) {
                    setError(response.data.error);
                } else {
                    setEleves(response.data);
                }
            })
            .catch(err => setError("Erreur réseau : " + err.message));
    }, []);

    return (
        <div>
            <h2>Liste des élèves</h2>
            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <ul>
                    {eleves.map(eleve => (
                        <li key={eleve.ID}>{eleve.Nom} {eleve.Prenom}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

const PageEleveNote = () => {
    return (
        <div>
            <Eleves />
        </div>
    );
};
export default PageEleveNote;