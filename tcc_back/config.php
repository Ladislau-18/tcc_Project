

<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$host = "localhost";
$user = "root";
$pass = "";
$bd = "bd_tcc";

try {
    $connection = new mysqli ($host, $user, $pass, $bd);
    $connection->set_charset("utf8mb4");

    if($connection -> connect_errno){
        throw new Exception("Falha ao conectar: " . $connection->connect_error);
    }

} catch (Exception $e) {
    error_log($e->getMessage());
    die("Erro interno no servidor. Tente novamente mais tarde.");
}

    
?>



