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
    try {
        $senhaHash = password_hash($dados->senha, PASSWORD_DEFAULT);
        
        $query = "INSERT INTO utilizadores (nome, numProcesso, email, senha) VALUES (?, ?, ?, ?)";
        $stmt = $connection->prepare($query);
        
        if ($stmt) {
            $stmt->bind_param("ssss", $dados->nome, $dados->numProcesso, $dados->email, $senhaHash);
            
            if ($stmt->execute()) {
                echo json_encode(["message" => "Usuário cadastrado com sucesso!"]);
            }
            $stmt->close();
        }
    } catch (mysqli_sql_exception $e) {
        // O código 1062 é o erro de 'Duplicate Entry' do MySQL
        if ($e->getCode() === 1062) {
            // Verifica qual campo duplicou
            if (str_contains($e->getMessage(), 'numProcesso')) {
                echo json_encode(["error" => "Número de Processo já está registado!"]);
            } else if (str_contains($e->getMessage(), 'email')) {
                echo json_encode(["error" => "E-mail já está registado!"]);
            } else {
                echo json_encode(["error" => "Dados duplicados detectados."]);
            }
        } else {
            echo json_encode(["error" => "Erro ao processar o cadastro."]);
        }
    }
} else {
    echo json_encode(["error" => "Preencha todos os campos obrigatórios."]);
}
?>