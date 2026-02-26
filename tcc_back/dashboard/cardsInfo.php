<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include_once '../config.php';

$response = [];

// 1. Total de Relatórios (Todos os TCCs)
$sqlTotal = "SELECT COUNT(*) as total FROM tccs";
$resTotal = mysqli_query($connection, $sqlTotal);
$rowTotal = mysqli_fetch_assoc($resTotal);
$response['totalRelatorios'] = $rowTotal['total'];

// 2. Cadastrados Este Ano (Baseado no ano atual)
$anoAtual = date('Y');
$sqlAno = "SELECT COUNT(*) as totalAno FROM tccs WHERE anoDefesa = '$anoAtual'";
$resAno = mysqli_query($connection, $sqlAno);
$rowAno = mysqli_fetch_assoc($resAno);
$response['totalAno'] = $rowAno['totalAno'];

// 3. Ocupação por Estante (Cálculo fictício de capacidade)
// Supondo que cada local cadastrado suporta 50 TCCs
$sqlCapacidade = "SELECT COUNT(*) as totalLocais FROM locaisArmazenamento";
$resCap = mysqli_query($connection, $sqlCapacidade);
$rowCap = mysqli_fetch_assoc($resCap);

$capacidadeTotal = $rowCap['totalLocais'] * 50; 
$ocupacaoAtual = $response['totalRelatorios'];

// Evitar divisão por zero
if ($capacidadeTotal > 0) {
    $percentagem = ($ocupacaoAtual / $capacidadeTotal) * 100;
} else {
    $percentagem = 0;
}
$response['ocupacao'] = round($percentagem, 1);

echo json_encode($response);
?>