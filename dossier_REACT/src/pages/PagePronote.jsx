import React, { useEffect, useState } from 'react';

const PronotePage = ({ page }) => {
    const [donnees, setDonnees] = useState([]);
    const [erreur, setErreur] = useState(null);

    useEffect(() => {
        fetch(`http://localhost/chemin/getPronote.php?page=${page}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) throw new Error(data.error);
                setDonnees(data);
            })
            .catch((err) => setErreur(err.message));
    }, [page]);

    if (erreur) return <div>Erreur : {erreur}</div>;

    return (
        <div>
            <h2>Données de {page}</h2>
            <pre>{JSON.stringify(donnees, null, 2)}</pre>
        </div>
    );
};

export default PronotePage;
