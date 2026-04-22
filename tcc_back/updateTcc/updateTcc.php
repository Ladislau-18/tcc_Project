<?php
date_default_timezone_set('Africa/Luanda');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include_once("../config.php");

$data = json_decode(file_get_contents("php://input"), true);

// Validação básica de segurança
$idTcc = isset($data['idTcc']) ? intval($data['idTcc']) : null;
$idLocal = isset($data['idLocal']) ? intval($data['idLocal']) : null;
$idUtilizadorLogado = isset($data['userId']) ? intval($data['userId']) : null;

if (!$idTcc || !$idLocal || !$idUtilizadorLogado) {
    echo json_encode(["status" => "error", "message" => "Dados incompletos para atualização."]);
    exit;
}

$connection->begin_transaction();

try {
    // 1. ATUALIZAR LOCALIZAÇÃO (Tabela: locaisarmazenamento)
    $stmtLoc = $connection->prepare("UPDATE locaisarmazenamento SET blocoArquivo = ?, estante = ?, prateleira = ?, compartimento = ? WHERE idLocal = ?");
    $stmtLoc->bind_param("ssssi", 
        $data['andar'], 
        $data['sala'], 
        $data['prateleira'], 
        $data['armario'], 
        $idLocal
    );
    $stmtLoc->execute();

    // 2. ATUALIZAR DADOS DO TCC (Tabela: tccs)
    $statusAprovacao = (intval($data['nota']) >= 10) ? 'Aprovado' : 'Reprovado';
    $stmtTcc = $connection->prepare("UPDATE tccs SET titulo = ?, orientadorNome = ?, anoDefesa = ?, notaFinal = ?, statusAprovacao = ? WHERE idTcc = ?");
    $stmtTcc->bind_param("ssdisi", 
        $data['titulo'], 
        $data['orientadorNome'], 
        $data['anoDefesa'], 
        $data['nota'], 
        $statusAprovacao,
        $idTcc
    );
    $stmtTcc->execute();

    // 3. SINCRONIZAR AUTORES (A técnica que acordamos)
    // Primeiro, removemos todos os vínculos antigos
    $stmtDel = $connection->prepare("DELETE FROM tcc_autores WHERE idTcc = ?");
    $stmtDel->bind_param("i", $idTcc);
    $stmtDel->execute();

    // Agora, inserimos os nomes que vieram do formulário
    foreach ($data['autores'] as $nomeAutor) {
        $nomeAutor = trim($nomeAutor);
        if (empty($nomeAutor)) continue;

        // Verifica se o aluno já existe globalmente para não duplicar IDs de alunos
        $stmtV = $connection->prepare("SELECT idAluno FROM alunos WHERE nome = ? LIMIT 1");
        $stmtV->bind_param("s", $nomeAutor);
        $stmtV->execute();
        $resV = $stmtV->get_result()->fetch_assoc();

        if ($resV) {
            $idAluno = $resV['idAluno'];
        } else {
            $stmtN = $connection->prepare("INSERT INTO alunos (nome) VALUES (?)");
            $stmtN->bind_param("s", $nomeAutor);
            $stmtN->execute();
            $idAluno = $connection->insert_id;
        }

        // Cria o novo vínculo
        $stmtP = $connection->prepare("INSERT INTO tcc_autores (idTcc, idAluno) VALUES (?, ?)");
        $stmtP->bind_param("ii", $idTcc, $idAluno);
        $stmtP->execute();
    }

    // 4. GERAR LOG NO HISTÓRICO
    $tipoAcao = "Edição de Relatório";
    $dataAcao = date('Y-m-d H:i:s');
    $tituloLog = $data['titulo'];

    $stmtHist = $connection->prepare("INSERT INTO historicomovimentacao (idTcc, idUtilizador, dataAcao, tipoAcao, tituloTcc) VALUES (?, ?, ?, ?, ?)");
    $stmtHist->bind_param("iisss", $idTcc, $idUtilizadorLogado, $dataAcao, $tipoAcao, $tituloLog);
    $stmtHist->execute();

    $connection->commit();
    echo json_encode(["status" => "success", "message" => "Relatório atualizado com sucesso!"]);

} catch (Exception $e) {
    $connection->rollback();
    echo json_encode(["status" => "error", "message" => "Erro ao processar edição: " . $e->getMessage()]);
}