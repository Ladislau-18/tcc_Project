<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE, GET, OPTIONS");

include_once("../config.php");

$idTcc = isset($_GET['id']) ? intval($_GET['id']) : null;

if (!$idTcc) {
    echo json_encode(["status" => "error", "message" => "ID não fornecido"]);
    exit;
}

$connection->begin_transaction();

try {
    // 1. BUSCAR O TÍTULO ANTES DE APAGAR (Essencial para o log não ficar vazio)
    $stmtBusca = $connection->prepare("SELECT titulo FROM tccs WHERE idTcc = ?");
    $stmtBusca->bind_param("i", $idTcc);
    $stmtBusca->execute();
    $res = $stmtBusca->get_result()->fetch_assoc();
    
    if (!$res) {
        throw new Exception("Relatório não encontrado no sistema.");
    }
    $tituloOriginal = $res['titulo'];

    // 2. REGISTRAR A ELIMINAÇÃO NO HISTÓRICO
    // Forçamos o ID do utilizador (certifique-se que o ID 1 existe na tabela utilizadores)
    $idUtilizadorLogado = 1; 
    $dataAcao = date('Y-m-d H:i:s');
    $tipoAcao = "Eliminação de Relatório";

    $stmtHist = $connection->prepare("INSERT INTO historicomovimentacao (idTcc, idUtilizador, dataAcao, tipoAcao) VALUES (?, ?, ?, ?)");
    // Se idTcc for NULL aqui, o log perde a referência. Passamos o ID atual.
    $stmtHist->bind_param("iiss", $idTcc, $idUtilizadorLogado, $dataAcao, $tipoAcao);
    
    if (!$stmtHist->execute()) {
        throw new Exception("Erro ao gravar histórico: " . $stmtHist->error);
    }

    // 3. APAGAR VÍNCULOS DE AUTORES
    $stmtAutores = $connection->prepare("DELETE FROM tcc_autores WHERE idTcc = ?");
    $stmtAutores->bind_param("i", $idTcc);
    $stmtAutores->execute();

    // 4. APAGAR O TCC
    // Com 'ON DELETE SET NULL', o idTcc no histórico mudará para NULL, mas a linha não some!
    $stmtTcc = $connection->prepare("DELETE FROM tccs WHERE idTcc = ?");
    $stmtTcc->bind_param("i", $idTcc);
    $stmtTcc->execute();

    $connection->commit();
    echo json_encode(["status" => "success", "message" => "Eliminação registada com sucesso."]);

} catch (Exception $e) {
    $connection->rollback();
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}

$connection->close();
?>