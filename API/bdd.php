<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if (basename(__FILE__) !== basename($_SERVER["SCRIPT_FILENAME"])) {
    return; // Inclus via require, ne rien exécuter
}

// Connexion à la base de données
function connecterBDD() {
    $host = 'localhost';
    $dbname = 'PronoteBDD';
    $username = 'root';
    $password = '';

    try {
        return new PDO('mysql:host=' . $host . ';dbname=' . $dbname . ';charset=utf8', $username, $password);
    } catch (Exception $e) {
        die(json_encode(['error' => 'Erreur de connexion à la BDD: ' . $e->getMessage()]));
    }
}

// Vérifie que la table est autorisée
function pageValide($page) {
    $tablesAutorisees = ['Eleves', 'Disciplines', 'Evaluations', 'Professeurs'];
    return in_array($page, $tablesAutorisees);
}

// Récupère toutes les données d'une table
function recupererDonnees($bdd, $page) {
    $table = 'Pronote_' . $page;

    try {
        $sql = "SELECT * FROM $table";
        $stmt = $bdd->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $e) {
        return ['error' => 'Erreur lors de la récupération des données: ' . $e->getMessage()];
    }
}

// Récupère les élèves pour une année et discipline donnée
function recupererElevesParAnneeEtDiscipline($bdd, $annee, $disciplineID) {
    try {
        $sql = "SELECT * FROM Pronote_Eleves WHERE Annee = ?";
        $stmt = $bdd->prepare($sql);
        $stmt->execute([$annee]);
        $eleves = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $resultat = [];

        foreach ($eleves as $eleve) {
            $filtre = [
                'Nom' => $eleve['Nom'],
                'Prenom' => $eleve['Prenom'],
            ];

            if (isset($eleve['Groupe'])) {
                $filtre['Groupe'] = $eleve['Groupe'];
            }

            // Changement ici : on cherche des colonnes de la forme 'Note_Discipline_Numero'
            foreach ($eleve as $cle => $val) {
                if (strpos($cle, 'Note_') === 0) {
                    $parts = explode('_', $cle);
                    // Vérifier que la structure est Note_Discipline_Numero
                    if (count($parts) === 3 && $parts[1] == $disciplineID) {
                        $filtre[$cle] = $val;
                    }
                }
            }

            $resultat[] = $filtre;
        }

        return $resultat;
    } catch (Exception $e) {
        return ['error' => 'Erreur lors de la récupération filtrée: ' . $e->getMessage()];
    }
}


// Récupère les évaluations pour une discipline et une année données
function recupererEvaluationsParDisciplineEtAnnee($bdd, $disciplineID, $annee) {
    try {
        // Ajouter le préfixe 'D' à la disciplineID pour correspondre à la base de données
        $disciplineID = 'D' . $disciplineID;

        // Modifier la requête pour ne sélectionner que le champ 'Libelle' et trier par 'Date' croissante
        $sql = "SELECT Libelle, Date FROM Pronote_Evaluations WHERE Discipline = ? AND Classe = ? ORDER BY Date ASC";
        $stmt = $bdd->prepare($sql);
        $stmt->execute([$disciplineID, $annee]);

        // Récupérer les résultats
        $evaluations = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Retourner uniquement le 'Libelle' et la 'Date'
        return $evaluations;
    } catch (Exception $e) {
        return ['error' => 'Erreur récupération évaluations: ' . $e->getMessage()];
    }
}



// Réponse pré-vol (OPTIONS CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Traitement principal
if (isset($_GET['action'])) {
    $bdd = connecterBDD();

    switch ($_GET['action']) {
        case 'eleves_annee_discipline':
            $annee = $_GET['annee'] ?? null;
            $discipline = $_GET['discipline'] ?? null;

            if ($annee && $discipline) {
                echo json_encode(recupererElevesParAnneeEtDiscipline($bdd, $annee, $discipline));
            } else {
                echo json_encode(['error' => 'Paramètres manquants']);
            }
            break;

        case 'evaluations_discipline_annee':
            $annee = $_GET['annee'] ?? null;
            $discipline = $_GET['discipline'] ?? null;

            if ($annee && $discipline) {
                echo json_encode(recupererEvaluationsParDisciplineEtAnnee($bdd, $discipline, $annee));
            } else {
                echo json_encode(['error' => 'Paramètres manquants']);
            }
            break;

        default:
            if (isset($_GET['page']) && pageValide($_GET['page'])) {
                echo json_encode(recupererDonnees($bdd, $_GET['page']));
            } else {
                echo json_encode(['error' => 'Action ou page invalide']);
            }
            break;
    }
} else {
    echo json_encode(['error' => 'Action non définie']);
}
?>
