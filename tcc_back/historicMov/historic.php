<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once("../config.php");

// 1. Preparamos a query (mesmo sem variáveis agora, o padrão é mais seguro)
$sql = "SELECT 
            h.idMov, 
            h.dataAcao, 
            h.tipoAcao, 
            u.nome AS utilizadorNome
        FROM historicomovimentacao h
        LEFT JOIN utilizadores u ON h.idUtilizador = u.idUtilizador
        ORDER BY h.dataAcao DESC";

try {
    $stmt = $connection->prepare($sql);
    
    if (!$stmt) {
        throw new Exception("Falha na preparação da consulta: " . $connection->error);
    }

    $stmt->execute();
    $result = $stmt->get_result();
    
    $logs = [];
    while ($row = $result->fetch_assoc()) {
        $logs[] = $row;
    }

    echo json_encode($logs);

} catch (Exception $e) {
    echo json_encode(["erro" => $e->getMessage()]);
}

$stmt->close();
$connection->close();
?>