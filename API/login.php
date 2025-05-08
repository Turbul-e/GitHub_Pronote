<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once('bdd.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $login = $data['login'] ?? '';
    $mdp = $data['mdp'] ?? '';

    if ($login && $mdp) {
        $bdd = connecterBDD();
        $stmt = $bdd->prepare("SELECT * FROM Pronote_Eleves WHERE login = ? AND mdp = ?");
        $stmt->execute([$login, $mdp]);
        $eleve = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($eleve) {
            echo json_encode(['success' => true, 'eleve' => $eleve]);
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
