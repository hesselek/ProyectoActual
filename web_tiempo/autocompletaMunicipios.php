<?php



$texto = strtolower(trim($_POST["municipio"]));

$sugerencias = array();
foreach($municipios as $indice => $nombre) {
  if(preg_match('/^('.$texto.')/i',$nombre)) {
    $sugerencias[] = $nombre;
    if(count($sugerencias)>20) { break; }
  }
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
