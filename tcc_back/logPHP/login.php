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

// Verificando se os dados chegaram
if (!empty($dados->numProcesso) && !empty($dados->senha) && !empty($dados->tipoAcesso)) {
    
    $numProcesso = $dados->numProcesso;
    $senhaInput = $dados->senha;

    $query = "SELECT idUtilisador, nome_utilizador, senha, tipoAcesso FROM utilizadores WHERE numProcesso = ? LIMIT 1";
    $stmt = mysqli_prepare($connection, $query);
    mysqli_stmt_bind_param($stmt, "s", $numProcesso);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $user = mysqli_fetch_assoc($result);

    if ($user && password_verify($senhaInput, $user['senha'])) {

        if ($user['tipoAcesso'] === $dados->tipoAcesso) {
            echo json_encode([
                "success" => true,
                "id" => $user['idUtilisador'],
                "nome" => $user['nome_utilizador'],
                "tipo" => $user['tipoAcesso']
            ]);

            
        } else {
            echo json_encode([
                "success" => false, 
                "error" => "Este usuário não tem permissão de acesso como " . $dados->tipoAcesso . "."
            ]);
        }

    } 
    else {
        echo json_encode([
            "success" => false, 
            "error" => "Número de processo ou senha incorretos."
        ]);
    }
}
?>