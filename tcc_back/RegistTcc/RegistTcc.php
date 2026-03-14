<?php

error_reporting(0); 
ini_set('display_errors', 0);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

$conn = new mysqli("localhost", "root", "", "acervo_tcc");

if ($conn->connect_error) {
    echo json_encode(["sucesso" => false, "mensagem" => "Falha na conexão: " . $conn->connect_error]);
    exit;
}

$dadosInput = json_decode(file_get_contents("php://input"), true);

if (!$dadosInput) {
    echo json_encode(["sucesso" => false, "mensagem" => "Dados nao recebidos"]);
    exit;
}

try {
    //Converter a data/hora do React para o formato do MySQL
    $dataRaw = $dadosInput['dataRegistro'];
    $dataMySQL = date('Y-m-d H:i:s', strtotime(str_replace('/', '-', $dataRaw)));

    //Inserir Localização
    $stmtLocal = $conn->prepare("INSERT INTO locaisArmazenamento (blocoArquivo, estante, prateleira, compartimento) VALUES (?, ?, ?, ?)");
    $bloco = $dadosInput['andar'];
    $estante = "Sala " . $dadosInput['sala'];
    $prateleira = $dadosInput['prateleira'];
    $comp = $dadosInput['armario'];
    
    $stmtLocal->bind_param("ssss", $bloco, $estante, $prateleira, $comp);
    $stmtLocal->execute();
    $idLocal = $conn->insert_id;

    // Buscar ID do Curso
    $stmtC = $conn->prepare("SELECT idCurso FROM cursos WHERE nome = ? LIMIT 1");
    $stmtC->bind_param("s", $dadosInput['curso']);
    $stmtC->execute();
    $res = $stmtC->get_result();
    $curso = $res->fetch_assoc();
    $idCurso = $curso ? $curso['idCurso'] : 1;

    // Inserir TCC/Relatório
    $stmtTcc = $conn->prepare("INSERT INTO tccs (titulo, autorNome, orientadorNome, anoDefesa, idCurso, idLocal) VALUES (?, ?, ?, ?, ?, ?)");
    $ano = intval($dadosInput['anoDefesa']);
    
    $stmtTcc->bind_param("sssiii", 
        $dadosInput['titulo'], 
        $dadosInput['autor'], 
        $dadosInput['orientador'], 
        $ano, 
        $idCurso, 
        $idLocal
    );

    if ($stmtTcc->execute()) {
        $idTccNovo = $conn->insert_id;

        // Inserir no Histórico com a Data e Hora
        $stmtHist = $conn->prepare("INSERT INTO historicoMovimentacao (idTcc, idUtilizador, dataAcao, tipoAcao) VALUES (?, ?, ?, 'Cadastro de Relatório')");
        $idUtilizadorLogado = 1; // Substituir pelo ID real do utilizador logado no futuro (apenas testando...)
        
        $stmtHist->bind_param("iis", $idTccNovo, $idUtilizadorLogado, $dataMySQL);
        $stmtHist->execute();

        echo json_encode(["sucesso" => true, "mensagem" => "Relatório e histórico registados com sucesso!"]);
    } else {
        echo json_encode(["sucesso" => false, "mensagem" => "Erro no banco: " . $conn->error]);
    }

} catch (Exception $e) {
    echo json_encode(["sucesso" => false, "mensagem" => "Erro interno: " . $e->getMessage()]);
}

$conn->close();
?>