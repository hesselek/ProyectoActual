<?php 
$periodico = $_GET['url'];
$contenido = file_get_contents($periodico);

header ("Content-type:text/xml");

echo $contenido;
?>