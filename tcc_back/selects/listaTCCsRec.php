<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// 1. Conexão
$conn = new mysqli("localhost", "root", "", "acervo_tcc");

if ($conn->connect_error) {
    echo json_encode(["erro" => "Conexão falhou"]);
    exit;
}

// 2. Query "Amigável"
// O LEFT JOIN não esconde o TCC se o curso não for encontrado
$sql = "SELECT t.*, c.nome as curso 
        FROM tccs t 
        LEFT JOIN cursos c ON t.idCurso = c.idCurso 
        ORDER BY t.idTcc DESC";

$result = $conn->query($sql);
$dados = [];

if ($result) {
    while($row = $result->fetch_assoc()) {
        // Garantimos que se o curso for nulo, apareça algo amigável
        if (!$row['curso']) {
            $row['curso'] = "Curso não atribuído";
        }
        $dados[] = $row;
    }
}

// 3. Resposta
echo json_encode($dados);
$conn->close();
?>






