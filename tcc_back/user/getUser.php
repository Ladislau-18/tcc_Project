<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json"); 

session_start();

if (iseet($_SESSION['user'])){
    echo jsin_encode([
        'logged' => true,
        'user' => $_SESSION['user']
    ]);
}
else{
    echo json_encode ([
        'logged' => false
    ]);
}





?>