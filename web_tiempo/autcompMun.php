<?php

$dwes = new PDO("mysql:host=localhost;dbname=ajax", "root", "root");
$entrada = $_POST["municipio"];
$texto = strtolower($entrada);
$sql = "SELECT * FROM LOCALIDADES WHERE TEXTO LIKE '".$texto."%'";

	 $consulta = $dwes->query($sql);
	 $resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);
	
	


$sugerencias = array();
$reemplaza = "<b>".$entrada."</b>";

foreach($resultado as $indice => $nombre) {
    $sugerencias[] = "[\"".str_ireplace($texto, $reemplaza, $nombre['TEXTO'])."\",".$nombre['CODIGO'].
    ",\"".html_entity_decode($nombre['TEXTO'])."\"]";
    if(count($sugerencias)>20) 
    	break;
}



	if(count($sugerencias)>0) {
	  echo "[";
	  echo implode($sugerencias, ",");
	  echo "]";
	}
	else {
	  echo "[]";
	}

?>
