<?php

// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "empresa";
$usuario   = "root";
$password  = "";

// Recojo los datos de entrada
$datosJSON = $_POST["datos"];
//Decodifico el objeto turismos
$componente = json_decode($datosJSON);

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

$sql = "INSERT INTO componente (idcomponente, nombre, descripcion, precio, idtipo) VALUES ('$componente->idcomponente','$componente->nombre','$componente->descripcion','$componente->precio', '$componente->idtipo');";
$resultado = mysqli_query($conexion,$sql);

if ($resultado)
{
    $respuesta["error"] = 0;
    $respuesta["mensaje"] = "Alta Componentes realizada"; 
} 

else 
{
    $respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error en el proceso de alta: ".mysqli_error($conexion);
}

echo json_encode($respuesta);

mysqli_close($conexion);
?>