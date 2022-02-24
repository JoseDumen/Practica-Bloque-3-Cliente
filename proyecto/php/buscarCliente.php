<?php

// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "potter";
$usuario   = "root";
$password  = "";

// Recojo los datos de entrada
$email = $_GET["email"];

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");
//mysqli_query($conexion,"utf8");

$sql = "SELECT * FROM cliente WHERE correo = '$email'";
$resultado = mysqli_query($conexion,$sql);

if($fila = $resultado->fetch_assoc()) {
    $respuesta = $fila;
}
else {
    $respuesta = false;
}

mysqli_close($conexion);

echo json_encode($respuesta);


?>