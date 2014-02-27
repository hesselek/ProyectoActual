<?php 
$periodico = $_POST['url'];
$contenido = file_get_contents($periodico);

header ("Content-type:text/xml");

echo $contenido;
?>