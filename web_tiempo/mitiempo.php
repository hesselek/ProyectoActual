<?php



$tiempo =  simplexml_load_file("http://www.aemet.es/xml/municipios/localidad_28013.xml");
$predicion = $tiempo->prediccion->dia[0]->estado_cielo[2];
$dia = $prediccion[0];
/*
 * Voy a parsear desde el servidor el contenido del xml
 */

echo $predicion;// $contenido;

?>