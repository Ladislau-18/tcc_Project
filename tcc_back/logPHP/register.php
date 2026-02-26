<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json"); 

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

include_once '../config.php';

$dados = json_decode(file_get_contents("php://input"));

if (!empty($dados->nome) && !empty($dados->numProcesso) && !empty($dados->email) && !empty($dados->senha)) {
    $senhaHash = password_hash($dados->senha, PASSWORD_DEFAULT);
    
    $query = "INSERT INTO utilizadores (nome, numProcesso, email, senha) VALUES (?, ?, ?, ?)";
    
    $stmt = $connection->prepare($query);
    
    if ($stmt) {
     
        $stmt->bind_param("ssss", $dados->nome, $dados->numProcesso, $dados->email, $senhaHash);
        
        if ($stmt->execute()) {
            echo json_encode(["message" => "Usuário cadastrado com sucesso!"]);
        } else {
            echo json_encode(["error" => "Erro ao cadastrar: E-mail ou Número de processo já existem."]);
        }
        $stmt->close();
    } else {
        echo json_encode(["Erro na preparação do banco de dados."]);
    }
} 
else {
    echo json_encode("Preencha todos os campos obrigatórios.");
}
?>