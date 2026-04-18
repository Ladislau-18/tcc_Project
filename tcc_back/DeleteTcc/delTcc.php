<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once("../config.php");


$idTcc = isset($_GET['id']) ? intval($_GET['id']) : null;
$idUtilizadorLogado = isset($_GET['userId']) ? intval($_GET['userId']) : null;

// LOG DE SEGURANÇA: Verifica se os dados chegaram
if (!$idTcc || !$idUtilizadorLogado) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Dados inválidos. TCC: $idTcc, User: $idUtilizadorLogado"]);
    exit;
}

$connection->begin_transaction();

try {
    // 1. BUSCA O TÍTULO LOGO NO INÍCIO (Única vez)
    $stmtBusca = $connection->prepare("SELECT titulo FROM tccs WHERE idTcc = ?");
    $stmtBusca->bind_param("i", $idTcc);
    $stmtBusca->execute();
    $resBusca = $stmtBusca->get_result()->fetch_assoc();
    
    // Se não encontrar AQUI, é porque o ID enviado não existe
    if (!$resBusca) {
        throw new Exception("Relatório não encontrado no banco.");
    }
    $tituloOriginal = $resBusca['titulo'];
    $stmtBusca->close(); // Fechamos logo para libertar a memória

    // 2. GRAVAR O HISTÓRICO
    $dataAcao = date('Y-m-d H:i:s');
    $tipoAcao = "Eliminação de Relatório";

    $stmtHist = $connection->prepare("INSERT INTO historicomovimentacao (idTcc, idUtilizador, dataAcao, tipoAcao, tituloTcc) VALUES (?, ?, ?, ?, ?)");
    $stmtHist->bind_param("iisss", $idTcc, $idUtilizadorLogado, $dataAcao, $tipoAcao, $tituloOriginal);
    $stmtHist->execute();
    $stmtHist->close();

    // 3. APAGAR VÍNCULOS DE AUTORES
    $stmtAutores = $connection->prepare("DELETE FROM tcc_autores WHERE idTcc = ?");
    $stmtAutores->bind_param("i", $idTcc);
    $stmtAutores->execute();
    $stmtAutores->close();

    // 4. APAGAR O TCC (O golpe final)
    $stmtTcc = $connection->prepare("DELETE FROM tccs WHERE idTcc = ?");
    $stmtTcc->bind_param("i", $idTcc);
    $stmtTcc->execute();
    $stmtTcc->close();

    // Se chegou aqui sem erros, confirmamos tudo
    $connection->commit();
    
    // IMPORTANTE: Retornar sucesso ANTES de qualquer outra consulta
    echo json_encode(["status" => "success", "message" => "Relatório eliminado com sucesso!"]);

} catch (Exception $e) {
    $connection->rollback();
    // Se o relatório foi apagado mas deu erro, é porque o erro veio DEPOIS do delete.
    // Mas com o commit no final, isso não deve acontecer.
    echo json_encode(["status" => "error", "message" => "Erro no Banco: " . $e->getMessage()]);
}

$connection->close();
?>