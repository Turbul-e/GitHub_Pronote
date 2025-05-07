<?php
header('Content-Type: application/json');

function connecterBDD() {
    $host = 'localhost';
    $dbname = 'PronoteBDD';
    $username = 'root';
    $password = '';

    try {
        return new PDO('mysql:host=' . $host . ';dbname=' . $dbname . ';charset=utf8', $username, $password);
    } catch (Exception $e) {
        die(json_encode(['error' => 'Erreur de connexion à la BDD']));
    }
}

function pageValide($page) {
    $tablesAutorisees = ['Eleves', 'Disciplines', 'Evaluations', 'Professeurs'];
    return in_array($page, $tablesAutorisees);
}

function recupererDonnees($bdd, $page) {
    $table = 'Pronote_' . $page;

    try {
        $sql = "SELECT * FROM $table";
        $stmt = $bdd->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $e) {
        return ['error' => 'Erreur lors de la récupération des données'];
    }
}

if (isset($_GET['page']) && pageValide($_GET['page'])) {
    $bdd = connecterBDD();
    echo json_encode(recupererDonnees($bdd, $_GET['page']));
} else {
    echo json_encode(['error' => 'Page invalide']);
}


