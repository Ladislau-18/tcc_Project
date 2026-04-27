<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include_once '../config.php';

$response = [];

// 1. Dados para o Gráfico de Barras (TCCs por Ano)
$sqlAnos = "SELECT anoDefesa as name, COUNT(*) as total FROM tccs GROUP BY anoDefesa ORDER BY anoDefesa ASC";
$resAnos = mysqli_query($connection, $sqlAnos);

$barData = [];
while ($row = mysqli_fetch_assoc($resAnos)) {
    $barData[] = [
        "name"  => $row['name'],
        "total" => (int)$row['total'] // converter para numero
    ];
}
$response['barData'] = $barData;




// 2. Dados para o Gráfico de Pizza (Status)
$sqlTipo = "SELECT tipo_projeto as name, COUNT(*) as value FROM tccs GROUP BY tipo_projeto";
$resTipo = mysqli_query($connection, $sqlTipo);

$circleData = [];
while ($row = mysqli_fetch_assoc($resTipo)) {
    $circleData[] = [
        // O "name" será "Individual" ou "Coletivo" (ou como estiver na DB)
        "name"  => $row['name'], 
        "value" => (int)$row['value']
    ];
}

$response['circleData'] = $circleData;

echo json_encode($response);
?>