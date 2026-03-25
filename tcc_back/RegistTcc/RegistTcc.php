<?php
include_once("../config.php");

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($connection->connect_error) {
    echo json_encode(["sucesso" => false, "mensagem" => "Falha na conexão: " . $connection->connect_error]);
    exit;
}

$dadosInput = json_decode(file_get_contents("php://input"), true);

if (!$dadosInput) {
    echo json_encode(["sucesso" => false, "mensagem" => "Dados não recebidos"]);
    exit;
}

// Iniciamos uma transação para garantir que tudo corra bem ou nada seja salvo
$connection->begin_transaction();

try {
    // 1. Preparar a Data
    $dataRaw = $dadosInput['dataRegistro'];
    $dataMySQL = date('Y-m-d H:i:s', strtotime(str_replace('/', '-', $dataRaw)));

    // 2. Inserir Localização
    $stmtLocal = $connection->prepare("INSERT INTO locaisArmazenamento (blocoArquivo, estante, prateleira, compartimento) VALUES (?, ?, ?, ?)");
    $bloco = $dadosInput['andar'];
    $estante = "Sala " . $dadosInput['sala'];
    $prateleira = $dadosInput['prateleira'];
    $comp = $dadosInput['armario'];
    $stmtLocal->bind_param("ssss", $bloco, $estante, $prateleira, $comp);
    $stmtLocal->execute();
    $idLocal = $connection->insert_id;

    // 3. Buscar ID do Curso
    $stmtC = $connection->prepare("SELECT idCurso FROM cursos WHERE nome = ? LIMIT 1");
    $stmtC->bind_param("s", $dadosInput['curso']);
    $stmtC->execute();
    $idCurso = ($res = $stmtC->get_result()->fetch_assoc()) ? $res['idCurso'] : 1;

    // 4. Inserir TCC/Relatório (Removido autorNome, Adicionado tipo_projeto)
    $stmtTcc = $connection->prepare("INSERT INTO tccs (titulo, orientadorNome, anoDefesa, idCurso, idLocal, tipo_projeto) VALUES (?, ?, ?, ?, ?, ?)");
    $ano = intval($dadosInput['anoDefesa']);
    $tipoProjeto = count($dadosInput['autores']) > 1 ? 'Grupo' : 'Individual';
    
    $stmtTcc->bind_param("ssiiis", 
        $dadosInput['titulo'], 
        $dadosInput['orientador'], 
        $ano, 
        $idCurso, 
        $idLocal,
        $tipoProjeto
    );
    $stmtTcc->execute();
    $idTccNovo = $connection->insert_id;

    // 5. LÓGICA DE AUTORES COM VALIDAÇÃO DE "RELATÓRIO ÚNICO"
    $listaAutores = $dadosInput['autores']; 

    foreach ($listaAutores as $nomeAutor) {
        $nomeAutor = trim($nomeAutor);

        //Verificar se este nome já existe (se sim, não poderá ser cadastrado.)
        $stmtVerif = $connection->prepare("SELECT idAluno FROM alunos WHERE nome = ? LIMIT 1");
        $stmtVerif->bind_param("s", $nomeAutor);
        $stmtVerif->execute();
        $resAluno = $stmtVerif->get_result()->fetch_assoc();

        if ($resAluno) {
            $idAluno = $resAluno['idAluno'];
            
            // Validação de segurança: Aluno só pode ter 1 TCC
            $stmtCheckLink = $connection->prepare("SELECT idTcc FROM tcc_autores WHERE idAluno = ? LIMIT 1");
            $stmtCheckLink->bind_param("i", $idAluno);
            $stmtCheckLink->execute();
            if ($stmtCheckLink->get_result()->fetch_assoc()) {
                throw new Exception("O aluno '$nomeAutor' já está associado a outro relatório.");
            }
        } else {
            // Cria o aluno APENAS com o nome 
            $stmtNovo = $connection->prepare("INSERT INTO alunos (nome) VALUES (?)");
            $stmtNovo->bind_param("s", $nomeAutor);
            $stmtNovo->execute();
            $idAluno = $connection->insert_id;
        }

        // Vincula ao/s autor/es
        $stmtPonte = $connection->prepare("INSERT INTO tcc_autores (idTcc, idAluno) VALUES (?, ?)");
        $stmtPonte->bind_param("ii", $idTccNovo, $idAluno);
        $stmtPonte->execute();
    }

    //Inserir no Histórico 
    $stmtHist = $connection->prepare("INSERT INTO historicoMovimentacao (idTcc, idUtilizador, dataAcao, tipoAcao) VALUES (?, ?, ?, 'Cadastro de Relatório')");
    $idUtilizadorLogado = 1; 
    $stmtHist->bind_param("iis", $idTccNovo, $idUtilizadorLogado, $dataMySQL);
    $stmtHist->execute();

    $connection->commit();
    echo json_encode(["sucesso" => true, "mensagem" => "Relatório registado com sucesso!"]);

} catch (Exception $e) {
    $connection->rollback();
    echo json_encode(["sucesso" => false, "mensagem" => "Erro interno: " . $e->getMessage()]);
}

$connection->close();
?>