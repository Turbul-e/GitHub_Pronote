import React from "react";
import "../style/PageProfNote.css";

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

    const handleMenuOne = () => {
        // do something
    };

    const handleMenuTwo = () => {
        // do something
    };

    return (
        <Dropdown
            open={open}
            trigger={<button className="dropdown" >Choisir la classe</button>}
            menu={[
                <button onClick={handleMenuOne}>Première année</button>,
                <button onClick={handleMenuTwo}>Deuxième année</button>,
            ]}
        />
    );
}

const ChoisirGroupe = () => {

    const handleTD1 = () => {
        // choisir juste les élèves du TD1
    };

    const handleTD2 = () => {
        // // choisir juste les élèves du TD2
    };

    const handleTD3 = () => {
        // // choisir juste les élèves du TD3
    };

    const handleTD4 = () => {
        // // choisir juste les élèves du TD4
    };

    return (
        <Dropdown
            open={open}
            trigger={<button className="dropdown" >Choisir le groupe de TD</button>}
            menu={[
                <button onClick={handleTD1}>Gr TD1</button>,
                <button onClick={handleTD2}>Gr TD2</button>,
                <button onClick={handleTD3}>Gr TD3</button>,
                <button onClick={handleTD4}>Gr TD4</button>,
            ]}
        />
    );
}

const Valider = () => {
    return (
        <div></div>
    )

}

const PageProfNote = () => {
    return (
        <div className="accueil-container">
            <h1 className="titre"> Mettre le nom du prof ici</h1>
            <h2 className="sous-titre">Voyez ici les notes que vous avez donné.</h2>
            <div className="boutons-groupés">
                <ChoisirClasse />
                <ChoisirGroupe />
                <Valider />
            </div>
        </div>
    );
};
export default PageProfNote;