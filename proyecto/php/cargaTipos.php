<?php

header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

// Create connection
$conn = new mysqli("localhost", "root", "", "empresa");
// Check connection
if ($conn->connect_error) {
    die("Conexion fallida: " . $conn->connect_error);
}
$conn->set_charset("utf8");


$sql = "SELECT * FROM tipo;";

$res = $conn->query($sql);

while ($fila = $res->fetch_assoc()) {
    $datos[] = $fila;
}

echo json_encode($datos);


$conn->close();

