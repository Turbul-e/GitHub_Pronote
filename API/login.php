<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once('bdd.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $login = $data['login'] ?? '';
    $mdp = $data['mdp'] ?? '';
    $type = $data['type'] ?? ''; // eleve ou prof

    if ($login && $mdp && $type) {
        $bdd = connecterBDD();

        if ($type == 'prof') {
            $stmt = $bdd->prepare("SELECT * FROM Pronote_Professeurs WHERE login = ? AND mdp = ?");
        } else {
            $stmt = $bdd->prepare("SELECT * FROM Pronote_Eleves WHERE login = ? AND mdp = ?");
        }

        $stmt->execute([$login, $mdp]);
        $utilisateur = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($utilisateur) {
            // On renvoie dynamiquement "prof" ou "eleve" selon le type
            echo json_encode(['success' => true, $type => $utilisateur]);
            exit();
        } else {
            echo json_encode(['success' => false, 'error' => 'Identifiants invalides']);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'Champs manquants']);
    }
} else {
    echo json_encode(['error' => 'Méthode non autorisée']);
}
?>
