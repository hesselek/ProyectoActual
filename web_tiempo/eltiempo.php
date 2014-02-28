<?php

$json_entrada = $_POST['datos'];  // $json_entrada --> cadena en JSON

$objeto = json_decode($json_entrada);  // convertimos a objeto

$resultado = $objeto->localidad;

$tiempo =  simplexml_load_file("http://www.aemet.es/xml/municipios/localidad_".$resultado.".xml");

$today = array();
$tomorrow = array();
if(date("H")<=12)
	$today['predicion'] = $tiempo->prediccion->dia[0]->estado_cielo[1]['descripcion'];
else
	$today['predicion'] = $tiempo->prediccion->dia[1]->estado_cielo[2]['descripcion'];

$tomorrow['predicion'] = $today['predicion'] = $tiempo->prediccion->dia[0]->estado_cielo[0]['descripcion'];

$predicion = $tiempo->prediccion->dia[0]->estado_cielo[2]['descripcion'];
$predicion1 = $tiempo->prediccion->dia[1]->estado_cielo[2]['descripcion'];

$objeto_salida = array($today,$tomorow);
echo json_encode($objeto_salida);// $contenido;

?>