<?php

$dwes = new PDO("mysql:host=localhost;dbname=ajax", "root", "root");
$entrada = $_POST["municipio"];
$texto = strtolower($entrada);
$sql = "SELECT * FROM LOCALIDADES WHERE TEXTO LIKE '".$texto."%'";

	 $consulta = $dwes->query($sql);
	 $resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);
	
	
/*	 $cadena = "<ul>";
	  
	 foreach ($resultado as $key => $value) {
		 
	 	
	 	$cadena .=$value['TEXTO'];
	 }
	  $cadena .= "<//ul>";
	 echo $cadena;
	/* echo "<\\ul>"
/*   echo*/


$sugerencias = array();
$reemplaza = "<b>".$entrada."</b>";
foreach($resultado as $indice => $nombre) {
    $sugerencias[] = array(str_ireplace($texto, $reemplaza, $nombre['TEXTO']),$nombre['CODIGO']);//$nombre['TEXTO'];
    if(count($sugerencias)>20) 
    	break;
}

if(isset($_GET["modo"]) && $_GET["modo"] != null) {
	$modo = $_GET["modo"];
}
else {
	$modo = "json";
}

if($modo == "ul") {
	if(count($sugerencias)>0) {
	  echo "<ul>\n<li>";
	  echo implode($sugerencias, "</li>\n<li>");
	  echo "</li>\n</ul>";
	}
	else {
	  echo "<ul></ul>";
	}
}
else {
	if(count($sugerencias)>0) {
	  echo "[ \"";
	  echo implode($sugerencias, "\", \"");
	  echo "\"]";
	}
	else {
	  echo "[]";
	}
}
?>
