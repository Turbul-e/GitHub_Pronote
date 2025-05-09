<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
if (basename(__FILE__) !== basename($_SERVER["SCRIPT_FILENAME"])) {
    // Ce fichier est inclus via un require, ne pas exécuter le reste
    return;
}

// Fonction pour se connecter à la base de données
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

// Fonction pour vérifier si la page est valide
function pageValide($page) {
    $tablesAutorisees = ['Eleves', 'Disciplines', 'Evaluations', 'Professeurs'];
    return in_array($page, $tablesAutorisees);
}

// Fonction pour récupérer toutes les données d'une table donnée
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

// Fonction pour récupérer les élèves selon l'année et la discipline
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
                'Prenom' => $eleve['Prenom']
            ];

            foreach ($eleve as $cle => $val) {
                if (strpos($cle, 'Note_') === 0) {
                    // Note_num1_num2 => on veut vérifier que le deuxième nombre correspond à $disciplineID
                    $parts = explode('_', $cle);
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


// CORS - En-tête OPTIONS pour les requêtes préalables
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Vérification de l'action de l'API
if (isset($_GET['action'])) {
    $bdd = connecterBDD();

    // Si l'action est de récupérer les élèves par année et discipline
    if ($_GET['action'] === 'eleves_annee_discipline') {
        $annee = $_GET['annee'] ?? null;
        $discipline = $_GET['discipline'] ?? null;

        if ($annee && $discipline) {
            echo json_encode(recupererElevesParAnneeEtDiscipline($bdd, $annee, $discipline));
        } else {
            echo json_encode(['error' => 'Paramètres manquants']);
        }
    } elseif (isset($_GET['page']) && pageValide($_GET['page'])) {
        // Si l'action est de récupérer les données d'une table valide
        echo json_encode(recupererDonnees($bdd, $_GET['page']));
    } else {
        echo json_encode(['error' => 'Page invalide']);
    }
} else {
    echo json_encode(['error' => 'Action non définie']);
}
?>
