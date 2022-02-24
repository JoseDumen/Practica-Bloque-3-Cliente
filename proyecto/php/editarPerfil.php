<?php

// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "potter";
$usuario   = "root";
$password  = "";

// Recojo los datos de entrada
extract($_POST);

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");
//mysqli_query($conexion,"utf8");

$sql = "UPDATE cliente SET dni = '$dni', nombre = '$nombre', direccion = '$direccion', tipoSuscripcion = '$tipoSuscripcion', password = '$nuevoPassword'
WHERE correo = '$correo'";
$resultado = mysqli_query($conexion,$sql);

if ($resultado){
    $respuesta["error"] = 0;
    $respuesta["mensaje"] = "Datos actualizados correctamente"; 
} else {
    $respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error en el proceso de edición: ".mysqli_error($conexion);
}

mysqli_close($conexion);

echo json_encode($respuesta);

/*
foreach ($datos as $key => $value) {
    $sql = "INSERT INTO GENTE (nombre, esactor, esdirector) VALUES ('"; 
    $sql.= $value->nombre."',". $value->actor.",".$value->director.");";
    $resultado = mysqli_query($conexion,$sql);
}

if ($resultado){
    $respuesta["error"] = 0;
    $respuesta["mensaje"] = "Alta realizada"; 
} else {
    $respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error en el proceso de alta: ".mysqli_error($conexion);
}

echo json_encode($respuesta);

mysqli_close($conexion);
*/ 
?>