<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

$dsn = "mysql:host=localhost;dbname=pronotebdd;charset=utf8";
$dsn .= "";
$host = 'localhost';		
$dbname = 'pronote_eleves';
$username = 'root';
$password = '';

try {
    $pdo = new PDO($dsn, $username, $password);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Connexion DB échouée"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$identifiant = $data["identifiant"] ?? "";
$mdp = $data["mot_de_passe"] ?? "";

$stmt = $pdo->prepare("SELECT * FROM eleves WHERE identifiant = ? AND mot_de_passe = ?");
$stmt->execute([$identifiant, $mdp]);

if ($stmt->rowCount() > 0) {
    echo json_encode(["success" => true, "message" => "Connexion réussie"]);
} else {
    echo json_encode(["success" => false, "message" => "Identifiants incorrects"]);
}
