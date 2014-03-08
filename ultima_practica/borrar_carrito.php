<?php
session_start();
include('funciones.php');

//funcion que me permite saber si un usuario est� logeado o no

cabecera('Anular Compra');
echo "<div id=\"contenido\">\n";


?>

<h1> Compra anulada</h1>
<?php
unset($_SESSION["ocarrito"]);

echo "<br><br><a href='introducir.php'>Volver</a>";



echo "</div>";
pie();
?>