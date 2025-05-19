import PageConnexion from "../composants/PageConnexion";

export default function PageEleveConnexion() {
  return (
    <PageConnexion
      typeUtilisateur="eleve"
      titre="Élève"
      redirectPath="/ConnexionEleve/EleveNote"
      lienMdpOublie="/ConnexionEleve/OubliMdp"
    />
  );
}
