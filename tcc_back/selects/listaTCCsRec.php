<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// 1. Conexão
include_once("../config.php");

if ($connection->connect_error) {
    echo json_encode(["erro" => "Conexão falhou"]);
    exit;
}

// 2. Query "Amigável"
// O LEFT JOIN não esconde o TCC se o curso não for encontrado
$sql = "SELECT 
            t.idTcc, 
            t.idLocal,
            t.titulo, 
            t.anoDefesa, 
            c.nome as curso, 
            GROUP_CONCAT(al.nome SEPARATOR ' | ') AS autores 
        FROM tccs t
        LEFT JOIN cursos c ON t.idCurso = c.idCurso
        LEFT JOIN tcc_autores ta ON t.idTcc = ta.idTcc
        LEFT JOIN alunos al ON ta.idAluno = al.idAluno
        GROUP BY t.idTcc
        ORDER BY t.idTcc DESC ";



$result = $connection->query($sql);
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
$connection->close();
?>






