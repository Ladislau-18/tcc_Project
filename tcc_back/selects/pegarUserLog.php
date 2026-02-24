<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include_once("../config.php");





$userId = isset($_GET['idUtilisador']) ? $_GET['idUtilisador'] : 1; 

$sql = "SELECT nome_utilizador, numProcesso FROM utilizadores WHERE idUtilisador = $userId;";
$result = mysqli_query($connection, $sql);

if ($row = mysqli_fetch_assoc($result)) {
    echo json_encode($row);
} else {
    echo json_encode(["erro" => "Usuario nao encontrado"]);
}
?>