import React from "react";
import "../style/PageAccueil.css";

//Idéalement on montrerait le bouton pour choisir le groupe de TD qu'une fois que la classe est séléctionnée, pour l'instant c'est pas le cas. 

const Dropdown = ({ trigger, menu }) => { //l'élément dropdown de base, à réutiliser ailleurs en précisant open, trigger et menu 
    const [open, setOpen] = React.useState(false);

    const handleMouseEnter = () => {
        setOpen(true);
    };

    const handleMouseLeave = () => {
        setOpen(false);
    };
    return (
        <div className="dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {trigger}
            {open ? (
                <ul className="menu">
                    {menu.map((menuItem, index) => (
                        <li key={index} className="menu-item">{menuItem}</li> //il considère le menu déroulé comme une liste, ce qui est nice
                    ))}
                </ul>
            ) : null}
        </div>
    );
};

const ChoisirClasse = () => {

    const [libelle, setLibelle] = React.useState("Première année");

    const handle1A = () => {
        // do something
        setLibelle("Première année")
    };

    const handle2A = () => {
        // do something
        setLibelle("Deuxième année")
    };
    const handle3A = () => {
        // do something
        setLibelle("Troisième année")
    };

    return (
        <Dropdown
            open={open}
            trigger={<button className="dropdown" >{">"} {libelle}</button>}
            menu={[
                <button onClick={handle1A}>Première année</button>,
                <button onClick={handle2A}>Deuxième année</button>,
                <button onClick={handle3A}>Troisième année</button>,
            ]}
        />
    );
}

const ChoisirGroupe = () => {

    const [libelle, setLibelle] = React.useState("Tous les élèves");

    const handleTous = () => {
        // choisir juste les élèves du TD1
        setLibelle("Tous les élèves")
    };

    const handleTD1 = () => {
        // choisir juste les élèves du TD1
        setLibelle("Groupe TD1")
    };

    const handleTD2 = () => {
        // // choisir juste les élèves du TD2
        setLibelle("Groupe TD2")
    };

    const handleTD3 = () => {
        // // choisir juste les élèves du TD3
        setLibelle("Groupe TD3")
    };

    const handleTD4 = () => {
        // // choisir juste les élèves du TD4
        setLibelle("Groupe TD4")
    };

    return (
        <Dropdown
            open={open}
            trigger={<button className="dropdown" > {">"} {libelle}</button>}
            menu={[
                <button onClick={handleTous}>Tous les élèves</button>,
                <button onClick={handleTD1}>Gr TD1</button>,
                <button onClick={handleTD2}>Gr TD2</button>,
                <button onClick={handleTD3}>Gr TD3</button>,
                <button onClick={handleTD4}>Gr TD4</button>,
            ]}
        />
    );
}

const Recherche = () => { //la zone de recherche dans laquelle on entre la classe et le groupe de TD + le bouton Valider pour entrer la recherche
    const valider = () => {
        //Ici, faire en sorte que quand on appuie sur "Valider" ça lance la recherche des évals, notes etc de tous les élèves de la classe + groupe de TD choisis. 
    }
    return (
        <div className="boutons-groupés">
            <ChoisirClasse />
            <ChoisirGroupe />
            <button className="bouton-simple">Valider</button>
        </div>
    )

}

const PageProfNote = () => {
    return (
        <div className="accueil-container">
            <h1 className="titre"> Mettre le nom du prof ici</h1>
            <h2 className="sous-titre">Voyez ici les notes que vous avez données.</h2>
            <div>

                <Recherche />
            </div>
        </div>
    );
};
export default PageProfNote;