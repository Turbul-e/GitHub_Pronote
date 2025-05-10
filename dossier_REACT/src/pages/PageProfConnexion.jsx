import PageConnexion from "../composants/PageConnexion";

export default function PageProfConnexion() {
    return (
        <PageConnexion
            typeUtilisateur="prof"
            titre="Professeur·e"
            redirectPath="/ConnexionProf/ProfNote"
            lienMdpOublie="/ConnexionEleve/OubliMdp"
        />
    );
}