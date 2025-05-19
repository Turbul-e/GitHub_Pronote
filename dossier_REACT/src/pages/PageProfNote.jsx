import React, { useState, useEffect } from "react";
import "../style/styleEnsemble.css";
import { useLocation } from "react-router-dom";

/*

AddGradeToList -> liste est dans le composant principal pour qu'il puisse l'utiliser dans le bouton "Enregistrer" et l'envoyer à bdd.php avec le reste
Mais le "handleInputChange" est dans LibelleARemplir -> faire une liste qui couvre les deux ? jsp. 

*/

/*
const NewGrades = (action, noteCherchee, id) => {

    if (action == "read") {
        return listNewGrades;
    }

    if (action == "update") {
        const newList = listNewGrades.map((item) => {
            if (item.id === id) {
                const noteMAJ = { id: id, grade: noteCherchee }
                return noteMAJ;
            }
        })
        setListNewGrades = newList;
    }

    if (action == "includes") { //pour gérerles includes -> si la liste le contient, on dit oui. Sinon on dit non. 
        if (listNewGrades.includes(noteCherchee)) {
            return true;
        }
        else return false;

    }

}
    */


// Composant Dropdown
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
    const prof = location.state; // Professeur récupéré depuis l'état du location

    const [annee, setAnnee] = useState("1A");
    const [groupe, setGroupe] = useState("Tous");
    const [eleves, setEleves] = useState([]);
    const [moyenneClasse, setMoyenneClasse] = useState(null);
    const [evaluations, setEvaluations] = useState([]);
    const [ajoutNote, setAjoutNote] = useState(false);
    const [listNewGrades, setListNewGrades] = useState([{ id: '00', grade: 0 }]); //ça a l'air de marcher... 


    // Récupérer les évaluations
    const recupererEvaluations = async () => {
        try {
            const url = `http://localhost/GitHub_Pronote/API/bdd.php?action=evaluations_discipline_annee&discipline=${prof.Discipline}&annee=${annee}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erreur HTTP ${response.status}`);
            }
            const data = await response.json();
            setEvaluations(data); // On stocke les libellés et les dates des évaluations

        } catch (error) {
            alert(`Erreur de récupération des évaluations: ${error.message}`);
        }
    };


    //Les inputs pour les notes après 

    const NoteARemplir = ({ disabled, id }) => {
        const [inputValue, setInputValue] = useState('');
        const [newList, setNewList] = useState(listNewGrades);

        const handleInputChange = (event, eleveID) => {

            //on change la valeur de la case
            setInputValue(event.target.value);

            console.log(id,)

            //Faire une disjonction de cas : est-ce que value était vide ou non ? Si oui, ajouter une ligne à la  liste. Sinon, trouver la ligne associée et ne changer que la note/la remplacer. 

            if (listNewGrades.includes(eleveID)) { //si la liste contient déjà l'ID de l'élève -> on parcourt la liste jusqu'à changer l'item ayant comme ID celui de l'élève en question
                setNewList = listNewGrades.map((item) => {
                    if (item.id === eleveID) {
                        const noteMAJ = { id: id, grade: event.target.value }
                        return noteMAJ;
                    }
                })
                setListNewGrades = newList;
                console.log(listNewGrades);
            }


            else { //si la liste ne contient pas déjà l'élève, on ajoute un item. 
                //il faut avoir l'ID de l'élève.
                setNewList = listNewGrades.concat({ id: eleveID, grade: event.target.value })
                setListNewGrades = newList;

                console.log(listNewGrades);
            }

        };

        return (
            <input type="number" id={id} value={inputValue} onChange={handleInputChange} disabled={disabled} />
        );
    }

    const LibelleARemplir = ({ disabled }) => {
        const [inputValue, setInputValue] = useState('');

        const handleInputChange = (event) => {
            setInputValue(event.target.value);
        };

        return (
            <input type="text" value={inputValue} onChange={handleInputChange} disabled={disabled} />
        );
    }

    // Récupérer les élèves et les évaluations
    const handleValider = async () => {
        try {
            if (!prof.Discipline) {
                alert("Erreur : Discipline non définie.");
                return;
            }

            const url = `http://localhost/GitHub_Pronote/API/bdd.php?action=eleves_annee_discipline&annee=${annee}&discipline=${prof.Discipline}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erreur HTTP ${response.status}`);
            }

            const data = await response.json();
            if (!Array.isArray(data)) {
                alert("Erreur dans la réponse API");
                return;
            }

            // Filtrage des élèves par groupe
            const filtres = groupe === "Tous"
                ? data
                : data.filter(eleve => String(eleve.Groupe) === groupe);

            setEleves(filtres);

            // Récupérer les évaluations
            await recupererEvaluations();

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


    /*AJOUT D'UNE NOUVELLE ÉVALUATION : 

    Pendant que le.la professeur.e entre les valeurs dans les zones d'input, la fonction addGradeToList les ajoute à une liste de toutes les notes. 
    Puis, quand le ou la professeur.e appuie sur "Enregistrer", ce tableau ainsi que toutes les informatiosn sur la nouvelle note sont envoyées dans la fonction qui connectera à la page php, et qui mettra à jour la base de données.  */

    const addGradeToList = (nom, prenom, event) => {
        //const nouvelleListe = listNewGrades.concat({ nom, prenom, event.target.value })
    }

    const AddGrade = async () => {
        if (!ajoutNote) { //si on est pas en train d'ajouter une note, on active juste les input pour qu'on puisse écrire dedans.
            setAjoutNote(true);
        }

        else { //Sinon, on enregistre les notes. 
            setAjoutNote(false);

            //Calcul du nombre total de note entrées dans la matière jusqu'ici
            let nombreNotes = 0;

            Object.entries(eleves)
                .filter(([key]) => key.startsWith("Note_"))
                .forEach(([_, note]) => {
                    const n = parseFloat(note);
                    if (!isNaN(n)) {
                        nombreNotes++;
                    }
                });


            //A CHANGER AVEC LE BON LIEN UNE FOIS QUE LA FONCTION PHP EST FINIE !!!! 
            /*const url = `http://localhost/GitHub_Pronote/API/bdd.php?action=ajout_note&annee=${annee}&discipline=${prof.Discipline}`; 

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erreur HTTP ${response.status}`);
            }

            const data = await response.json();
            if (!Array.isArray(data)) {
                alert("Erreur dans la réponse API");
                return;
            }*/


        }
    }


    //ET ENFIN L'AFFICHAGE DE LA PAGE ICI//


    return (
        <div className="accueil-container">
            <h1 className="titre">{prof.Prenom} {prof.Nom}</h1>
            <h2 className="sous-titre">Voyez ici les notes que vous avez données.</h2>

            <div className="boutons-groupés">
                {/* Dropdown pour sélectionner l'année */}
                <Dropdown
                    trigger={<button className="dropdown">{">"} {annee}</button>}
                    menu={[
                        <button onClick={() => setAnnee("1A")}>Première année</button>,
                        <button onClick={() => setAnnee("2A")}>Deuxième année</button>,
                        <button onClick={() => setAnnee("3A")}>Troisième année</button>
                    ]}
                />
                {/* Dropdown pour sélectionner le groupe */}
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
                                <th></th>
                                <th></th>
                                {evaluations.map((evaluation) => (
                                    <th key={evaluation.ID}></th>
                                ))}
                                {/*LE BOUTON POUR "AJOUTER UNE NOTE | ENREGISTRER" */}
                                <th><button onClick={AddGrade}>{ajoutNote ? "Enregistrer" : "Ajouter une note"}</button></th>
                                <th></th>
                            </tr>
                            <tr>
                                <th>Nom</th>
                                <th>Prénom</th>
                                {evaluations.map((evaluation, index) => (
                                    <th key={index}>{evaluation.Libelle}</th>
                                ))}
                                <th><LibelleARemplir disabled={!ajoutNote} placeholder="Nouvelle évaluation" id="libelleNouvelleNote" /></th>
                                <th>Moyenne</th>
                            </tr>
                        </thead>


                        {/*LE TABLEAU DE NOTES*/}
                        <tbody>
                            {eleves.map((eleve, index) => (
                                <tr key={index}>

                                    <td>{eleve.Nom}</td>
                                    <td>{eleve.Prenom}</td>

                                    {/*TOUTES LES NOTES DE L'ÉLÈVE */}
                                    {evaluations.map((evaluation, idx) => {
                                        // Générer la clé de la note en fonction de l'index de l'évaluation (1 pour la première, 2 pour la deuxième, etc.)
                                        const noteKey = `Note_${prof.Discipline}_${idx + 1}`;

                                        return (
                                            <td key={idx}>
                                                {/* Affiche la note correspondante, ou "-" si la note n'est pas présente */}
                                                {eleve[noteKey]}
                                            </td>
                                        );
                                    })}


                                    {/* Pour ajouter des notes : on fait un input numérique, qui s'active quand on clique sur ajouter une note et qui est 
                                    identifiable grâce à l'ID de l'élève => permettra de le mettre plus facilement dans le tableau SQL à la fin. Quand la valeur
                                    de l'input est changée, elle change également dans la liste de nouvelles notes. 
                                    */}
                                    <td><NoteARemplir id={eleve.ID} disabled={!ajoutNote} /></td>


                                    <td>{calculerMoyenneEleve(eleve)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Aucun élève affiché. Cliquez sur "Valider".</p>
                )}
            </div>

            {/*
            <ul>
                {listNewGrades.map((id, grade) => {
                    return (
                        <li key={id}>{id} : {grade} </li>
                    )
                })

                }
            </ul>*/}
        </div>
    );
};

export default PageProfNote;
