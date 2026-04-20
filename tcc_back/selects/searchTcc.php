<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once("../config.php");

// 1. Sanitização básica para evitar erros de caracteres especiais
$word = isset($_GET['q']) ? mysqli_real_escape_string($connection, $_GET['q']) : '';
$busca = "%".$word."%";

// 2. SQL com referências explícitas para evitar ambiguidade
$sql = "SELECT 
    t.idTcc,
    l.idLocal, 
    t.titulo, 
    c.nome AS curso, 
    t.orientadorNome,
    c.areaFormacao, 
    t.anoDefesa,
    t.statusAprovacao,
    t.notaFinal,
    l.blocoArquivo, 
    l.estante, 
    l.prateleira,
    l.compartimento,
    GROUP_CONCAT(DISTINCT al.nome SEPARATOR ', ') AS autores
    FROM tccs t
    LEFT JOIN cursos c ON t.idCurso = c.idCurso
    LEFT JOIN locaisarmazenamento l ON t.idLocal = l.idLocal
    LEFT JOIN tcc_autores ta ON t.idTcc = ta.idTcc
    LEFT JOIN alunos al ON ta.idAluno = al.idAluno
    WHERE t.titulo LIKE '$busca'
    OR c.nome LIKE '$busca'
    OR al.nome LIKE '$busca'
    GROUP BY t.idTcc, l.idLocal, t.titulo, c.nome, t.orientadorNome, c.areaFormacao, t.anoDefesa, t.statusAprovacao, t.notaFinal, l.blocoArquivo, l.estante, l.prateleira, l.compartimento;";
if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $tccs[] = $row;
    }
} else {
    // Se houver erro no SQL, retornamos um erro JSON em vez de nada
    // Isso evita o erro de "map is not a function"
    echo json_encode(["erro" => mysqli_error($connection)]);
    exit;
}

// Garante que sempre enviamos um array, mesmo que vazio
echo json_encode($tccs);
?>