import React from "react";
import "../style/PageProfNote.css";

const Dropdown = ({ open, trigger, menu }) => { //l'élément dropdown de base, à réutiliser ailleurs en précisant open, trigger et menu 
    return (
        <div className="dropdown">
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
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };
    const handleMenuOne = () => {
        // do something
        setOpen(false);
    };

    const handleMenuTwo = () => {
        // do something
        setOpen(false);
    };

    return (
        <Dropdown
            open={open}
            trigger={<button className="dropdown" onClick={handleOpen}>Choisir la classe</button>}
            menu={[
                <button onClick={handleMenuOne}>Première année</button>,
                <button onClick={handleMenuTwo}>Deuxième année</button>,
            ]}
        />
    );
}

const ChoisirGroupe = () => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };
    const handleTD1 = () => {
        // choisir juste les élèves du TD1
        setOpen(false);
    };

    const handleTD2 = () => {
        // // choisir juste les élèves du TD2
        setOpen(false);
    };

    const handleTD3 = () => {
        // // choisir juste les élèves du TD3
        setOpen(false);
    };

    const handleTD4 = () => {
        // // choisir juste les élèves du TD4
        setOpen(false);
    };

    return (
        <Dropdown
            open={open}
            trigger={<button className="dropdown" onClick={handleOpen}>Choisir le groupe de TD</button>}
            menu={[
                <button onClick={handleTD1}>Gr TD1</button>,
                <button onClick={handleTD2}>Gr TD2</button>,
                <button onClick={handleTD3}>Gr TD3</button>,
                <button onClick={handleTD4}>Gr TD4</button>,
            ]}
        />
    );
}

const PageProfNote = () => {
    return (
        <div className="accueil-container">
            <h1 className="titre"> Mettre le nom du prof ici</h1>
            <h2 className="sous-titre">Voyez ici les notes que vous avez donné.</h2>
            <div className="boutons-groupés">
                <ChoisirClasse />
                <ChoisirGroupe />
            </div>
        </div>
    );
};
export default PageProfNote;