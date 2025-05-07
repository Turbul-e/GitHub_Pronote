import { useState } from 'react';
function MonBouton(props) {
    const [etat, setEtat] = useState(0);
    const [couleur, setCouleur] = useState('aliceblue')
    const cliquer = () => {
        setEtat(etat + 1);
        if (etat >= 6) {
            setCouleur('darkslateblue');
        }
        if (etat >= 9) {
            setEtat(0);
            setCouleur('aliceblue');
        }
    }
    return (<button onClick={cliquer} style={{ backgroundColor: couleur }} className="prout">
        {props.contenu} {etat}
    </button>)
        ;
}

export default MonBouton