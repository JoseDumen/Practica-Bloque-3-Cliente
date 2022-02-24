<?php

// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "potter";
$usuario   = "root";
$password  = "";

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_query($conexion,"utf8");

// Consulta SQL para obtener los datos de los centros.
$sql = "SELECT dni, correo, nombre, direccion, tipoSuscripcion FROM cliente WHERE dni NOT LIKE '00000000A'"; 
$resultados = mysqli_query($conexion,$sql);

$XML ='<?xml version="1.0" encoding="UTF-8"?>';
$XML .='<datos>';

while ($fila = mysqli_fetch_array($resultados)) {
    $XML .='<cliente>';
        $XML .='<dni>'.$fila["dni"].'</dni>';
        $XML .='<correo>'.$fila["correo"].'</correo>';
        $XML .='<nombre>'.$fila["nombre"].'</nombre>';
        $XML .='<direccion>'.$fila["direccion"].'</direccion>';
        $XML .='<tipoSuscripcion>'.$fila["tipoSuscripcion"].'</tipoSuscripcion>';
    $XML .='</cliente>';
}

$XML .='</datos>';

// Cabecera de respuesta indicando que el contenido de la respuesta es XML
header("Content-Type: text/xml");
// Para que el navegador no haga cache de los datos devueltos por la página PHP.
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

echo utf8_encode($XML);

mysqli_close($conexion);
?>