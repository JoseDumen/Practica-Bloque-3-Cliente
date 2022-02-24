<?php

// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "potter";
$usuario   = "root";
$password  = "";

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_query($conexion,"utf8");


$orden = $_GET["orden"];
$tipo = $_GET["tipo"];
$valor = $_GET["valor"];

// Consulta SQL para obtener los datos de los centros.
$sql = "SELECT idProducto, nombre, precio, stock, propietario, material, personaje, tipoMuneco FROM producto";

if($orden == "mayor"){
    $sql .= " WHERE precio >= ".$valor;
} else {
    $sql .= " WHERE precio <= ".$valor;
}

if($tipo == "munecos"){
    $sql .= " AND tipo like 'M'";
} else if($tipo == "varitas"){
    $sql .= " AND tipo like 'V'";
}

$resultados = mysqli_query($conexion,$sql);

$XML ='<?xml version="1.0" encoding="UTF-8"?>';
$XML .='<datos>';

while ($fila = mysqli_fetch_array($resultados)) {
    $XML .='<producto>';
        $XML .='<idproducto>'.$fila["idProducto"].'</idproducto>';
        $XML .='<nombre>'.$fila["nombre"].'</nombre>';
        $XML .='<precio>'.$fila["precio"].'</precio>';
        $XML .='<stock>'.$fila["stock"].'</stock>';
        $XML .='<propietario>'.$fila["propietario"].'</propietario>';
        $XML .='<material>'.$fila["material"].'</material>';
        $XML .='<personaje>'.$fila["personaje"].'</personaje>';
        $XML .='<tipoMuneco>'.$fila["tipoMuneco"].'</tipoMuneco>';
    $XML .='</producto>';
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