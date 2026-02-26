<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json"); 

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

session_start();
include_once "../config.php";

$dados = json_decode(file_get_contents("php://input"));


if (!empty($dados->numProcesso) && !empty($dados->senha)) {
    
    $numProcesso = $dados->numProcesso;
    $senhaInput = $dados->senha;

 
    $query = "SELECT idUtilizador, nome, senha FROM utilizadores WHERE numProcesso = ? LIMIT 1";
    $stmt = mysqli_prepare($connection, $query);
    mysqli_stmt_bind_param($stmt, "s", $numProcesso);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $user = mysqli_fetch_assoc($result);


    if ($user && password_verify($senhaInput, $user['senha'])) {
        
        
        echo json_encode([
            "success" => true,
            "id" => $user['idUtilizador'],
            "nome" => $user['nome']
        ]);

    } else {
        echo json_encode([
            "success" => false, 
            "error" => "Número de processo ou senha incorretos."
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "error" => "Por favor, preencha todos os campos."
    ]);
}
?>