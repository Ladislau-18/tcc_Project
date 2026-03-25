<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once("../config.php");
/*Pegar a palavra que vem do React em SearchBar*/
$word = isset($_GET['q']) ? $_GET['q'] : '';

/*Preparando a palavra para a pesquisa no SQL com os '%'*/
$busca = "%".$word."%";

$sql = "SELECT 
    t.idTcc,
    t.titulo, 
    c.nome, 
    t.anoDefesa,
    GROUP_CONCAT(al.nome) AS autores 
    FROM tccs t

    LEFT JOIN cursos c ON t.idCurso = c.idCurso
    LEFT JOIN tcc_autores ta ON t.idTcc = ta.idTcc
    LEFT JOIN alunos al ON ta.idAluno = al.idAluno
    
    WHERE t.titulo LIKE '$busca'
    OR c.nome LIKE '$busca'
    GROUP BY t.idTcc;";
    
$result = mysqli_query($connection, $sql);

$tccs = [];
if ($result){
    while ($row = mysqli_fetch_assoc($result)) {
        $tccs[] = $row;
    
    }
}

echo json_encode($tccs);

?>
