
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once("../config.php");

$sql = "SELECT t.titulo,t.anoDefesa,c.nome_Curso
        FROM tcc t
        INNER JOIN curso c 
        ON t.idCurso = c.idCurso
        ORDER BY t.anoDefesa DESC
        LIMIT 3;";

$result = mysqli_query($connection, $sql);

$tccs = [];

while ($row = mysqli_fetch_assoc($result)) {
    $tccs[] = $row;

}

echo json_encode($tccs);









