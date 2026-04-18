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
    // Mapeando: andar -> blocoArquivo | sala -> estante | armario -> compartimento
    $stmtLocal = $connection->prepare("INSERT INTO locaisarmazenamento (blocoArquivo, estante, prateleira, compartimento) VALUES (?, ?, ?, ?)");
    
    $bloco = $dadosInput['andar'];
    $salaEstante = "Sala " . $dadosInput['sala'];
    $prateleira = $dadosInput['prateleira'];
    $armarioComp = $dadosInput['armario'];
    
    $stmtLocal->bind_param("ssss", $bloco, $salaEstante, $prateleira, $armarioComp);
    $stmtLocal->execute();
    $idLocal = $connection->insert_id;

    // 3. Buscar ID do Curso
    $stmtC = $connection->prepare("SELECT idCurso FROM cursos WHERE nome = ? LIMIT 1");
    $stmtC->bind_param("s", $dadosInput['curso']);
    $stmtC->execute();
    $idCurso = ($res = $stmtC->get_result()->fetch_assoc()) ? $res['idCurso'] : 1;

    // 4. Inserir TCC/Relatório (Adicionado notaFinal e tipo_projeto)
    $stmtTcc = $connection->prepare("INSERT INTO tccs (titulo, orientadorNome, anoDefesa, idCurso, idLocal, tipo_projeto, notaFinal, statusAprovacao) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    
    $ano = intval($dadosInput['anoDefesa']);
    $nota = intval($dadosInput['nota']); // Valor numérico vindo do React
    $status = ($nota >= 10) ? 'Aprovado' : 'Reprovado';
    $tipoProjeto = count($dadosInput['autores']) > 1 ? 'Grupo' : 'Individual';
    
    $stmtTcc->bind_param("ssiiisis", 
        $dadosInput['titulo'], 
        $dadosInput['orientadorNome'], 
        $ano, 
        $idCurso, 
        $idLocal,
        $tipoProjeto,
        $nota,
        $status
    );
    $stmtTcc->execute();
    $idTccNovo = $connection->insert_id;

    // 5. Lógica de Autores
    $listaAutores = $dadosInput['autores']; 

    foreach ($listaAutores as $nomeAutor) {
        $nomeAutor = trim($nomeAutor);

        // Verificar se este aluno já existe
        $stmtVerif = $connection->prepare("SELECT idAluno FROM alunos WHERE nome = ? LIMIT 1");
        $stmtVerif->bind_param("s", $nomeAutor);
        $stmtVerif->execute();
        $resAluno = $stmtVerif->get_result()->fetch_assoc();

        if ($resAluno) {
            $idAluno = $resAluno['idAluno'];
            
            // Validação: Aluno só pode ter 1 TCC associado
            $stmtCheckLink = $connection->prepare("SELECT idTcc FROM tcc_autores WHERE idAluno = ? LIMIT 1");
            $stmtCheckLink->bind_param("i", $idAluno);
            $stmtCheckLink->execute();
            if ($stmtCheckLink->get_result()->fetch_assoc()) {
                throw new Exception("O aluno '$nomeAutor' já possui um relatório cadastrado no sistema.");
            }
        } else {
            $stmtNovo = $connection->prepare("INSERT INTO alunos (nome) VALUES (?)");
            $stmtNovo->bind_param("s", $nomeAutor);
            $stmtNovo->execute();
            $idAluno = $connection->insert_id;
        }

        // Vincula na tabela de relacionamento (usando tcc_autores com underline)
        $stmtPonte = $connection->prepare("INSERT INTO tcc_autores (idTcc, idAluno) VALUES (?, ?)");
        $stmtPonte->bind_param("ii", $idTccNovo, $idAluno);
        $stmtPonte->execute();
    }

    // 6. Inserir no Histórico
$tituloCadastrado = $dadosInput['titulo']; 
$tipoAcaoCadastro = "Cadastro de Relatório";

$stmtHist = $connection->prepare("INSERT INTO historicomovimentacao (idTcc, idUtilizador, dataAcao, tipoAcao, tituloTcc) VALUES (?, ?, ?, ?, ?)");
$idUtilizadorLogado = 1; 
$stmtHist->bind_param("iisss", $idTccNovo, $idUtilizadorLogado, $dataMySQL, $tipoAcaoCadastro, $tituloCadastrado);
$stmtHist->execute();

    $connection->commit();
    echo json_encode(["sucesso" => true, "mensagem" => "Relatório registrado com sucesso!", "id" => $idTccNovo]);

} catch (Exception $e) {
    $connection->rollback();
    echo json_encode(["sucesso" => false, "mensagem" => "Erro ao registrar: " . $e->getMessage()]);
}

$connection->close();
?>