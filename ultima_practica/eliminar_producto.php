<?php

include('funciones.php');
cabecera('Mi carrito');
echo "<div id=\"contenido\">\n";

echo "<h1>Producto Eliminado</h1>";
$_SESSION["ocarrito"]->elimina_producto($_GET["linea"]);
?>
<br><br><a href="introducir.php">Volver</a><br><br>
<a href="ver_carrito.php">Ver carrito</a>
<?php


echo "</div>";
pie();

?>
