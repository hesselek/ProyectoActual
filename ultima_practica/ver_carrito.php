<?php

include('funciones.php');
cabecera('Mi carrito');
echo "<div id=\"contenido\">\n";

echo "<h1>Mi carrito de la compra</h1><br>";

$_SESSION["ocarrito"]->imprime_carrito();

?>
<br><br><a href="introducir.php">Volver</a>
<?php
echo "</div>";
pie();
?>