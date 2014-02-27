<?php

$json_entrada = $_POST["datos"];  // $json_entrada --> cadena en JSON

$objeto = json_decode($json_entrada);  // convertimos a objeto

$resultado = $objeto->localidad;

$tiempo =  simplexml_load_file("http://www.aemet.es/xml/municipios/localidad_".$resultado.".xml");
$predicion = $tiempo->prediccion->dia[0]->estado_cielo[2];
$dia = $prediccion[0];
/*
 * Voy a parsear desde el servidor el contenido del xml
 */

echo $predicion;// $contenido;

?>