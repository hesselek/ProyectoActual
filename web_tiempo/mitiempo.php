<?php

//$tiempo =  simplexml_load_file("http://www.aemet.es/xml/municipios/localidad_".$resultado.".xml");

$tiempo =  simplexml_load_file("localidad_28013.xml");


/*
 * Voy a parsear desde el servidor el contenido del xml
 */

//if(date("H")<=12)
	//$today['predicion'] = $tiempo->prediccion->dia[0]->estado_cielo[1]['descripcion'];
//else
	$today[0] = $tiempo->prediccion->dia[0]->estado_cielo[2]['descripcion'];

$tomorrow[0] =  $tiempo->prediccion->dia[0]->estado_cielo[2]['descripcion'];


$objeto_salida = array($today,$tomorrow);
echo json_encode($objeto_salida);
echo date("H:m:s");

?>