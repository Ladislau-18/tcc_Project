<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once("../config.php");

// Configuração da Paginação
$limite = 10; // Número de logs por página
$pagina = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$offset = ($pagina - 1) * $limite;

try {
    // 1. Query para contar o total de registos (necessário para a paginação no frontend)
    $totalRes = $connection->query("SELECT COUNT(*) as total FROM historicomovimentacao");
    $totalRegistos = $totalRes->fetch_assoc()['total'];
    $totalPaginas = ceil($totalRegistos / $limite);

    // 2. Query principal com LIMIT e OFFSET
    $sql = "SELECT 
                h.idMov, 
                h.dataAcao, 
                h.tipoAcao,
                h.tituloTcc, 
                u.nome AS utilizadorNome
            FROM historicomovimentacao h
            LEFT JOIN utilizadores u ON h.idUtilizador = u.idUtilizador
            ORDER BY h.dataAcao DESC
            LIMIT ? OFFSET ?";

    $stmt = $connection->prepare($sql);
    
    if (!$stmt) {
        throw new Exception("Falha na preparação da consulta: " . $connection->error);
    }

    // "ii" significa que estamos a passar dois números inteiros
    $stmt->bind_param("ii", $limite, $offset);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $logs = [];
    while ($row = $result->fetch_assoc()) {
        $logs[] = $row;
    }

    // Retornamos os dados e as informações de paginação
    echo json_encode([
        "logs" => $logs,
        "totalRegistos" => $totalRegistos,
        "totalPaginas" => $totalPaginas,
        "paginaAtual" => $pagina
    ]);

} catch (Exception $e) {
    echo json_encode(["erro" => $e->getMessage()]);
}

if(isset($stmt)) $stmt->close();
$connection->close();
?>