import PageConnexion from "../composants/PageConnexion";

export default function PageProfConnexion() {
    return (
        <PageConnexion
            typeUtilisateur="eleve"
            titre="Élève"
            redirectPath="/ConnexionEleve/EleveNote"
            lienMdpOublie="/ConnexionEleve/OubliMdp"
        />
    );
}