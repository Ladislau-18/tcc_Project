<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once("../config.php");
/*Pegar a palavra que vem do React em SearchBar*/
$word = isset($_GET['q']) ? $_GET['q'] : '';

/*Preparando a palavra para a pesquisa no SQL com os '%'*/
$busca = "%".$word."%";
$buscaAno = $word;

$sql = "SELECT t.titulo, c.nome, t.autorNome,  t.anoDefesa, t.orientadorNome, c.areaFormacao FROM tccs t
        INNER JOIN cursos c
        ON t.idCurso = c.idCurso
        WHERE t.titulo LIKE '$busca'
        OR t.autorNome LIKE '$busca'
        OR t.anoDefesa LIKE '$buscaAno'
        OR c.nome LIKE '$busca'
        OR t.orientadorNome LIKE '$busca'
        or c.areaFormacao LIKE '$busca';";

$result = mysqli_query($connection, $sql);

$tccs = [];
if ($result){
    while ($row = mysqli_fetch_assoc($result)) {
        $tccs[] = $row;
    
    }
}

echo json_encode($tccs);
