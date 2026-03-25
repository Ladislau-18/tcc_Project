<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: DELETE");

include_once("../config.php");

// Pegar o ID enviado pela URL 
$idTcc = isset($_GET['id']) ? $_GET['id'] : null;

if (!$idTcc) {
    echo json_encode(["status" => "error", "message" => "ID não fornecido"]);
    exit;
}



$connection->begin_transaction();

try {
    // Apagar os vínculos de autores primeiro
    $sqlAutores = "DELETE FROM tcc_autores WHERE idTcc = ?";
    $stmt1 = $connection->prepare($sqlAutores);
    $stmt1->bind_param("i", $idTcc);
    $stmt1->execute();

    // Apagar o histórico de movimentação (se houver)
    $sqlHist = "DELETE FROM historicomovimentacao WHERE idTcc = ?";
    $stmt2 = $connection->prepare($sqlHist);
    $stmt2->bind_param("i", $idTcc);
    $stmt2->execute();

    // Apagar o TCC na tabela principal
    $sqlTcc = "DELETE FROM tccs WHERE idTcc = ?";
    $stmt3 = $connection->prepare($sqlTcc);
    $stmt3->bind_param("i", $idTcc);
    $stmt3->execute();

    
    $connection->commit();
    echo json_encode(["status" => "success", "message" => "Relatório removido com sucesso"]);

} catch (Exception $e) {
    $connection->rollback();
    echo json_encode(["status" => "error", "message" => "Falha ao apagar: " . $e->getMessage()]);
}
?>