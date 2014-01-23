<?php
include ("lib_carrito.php");
$_SESSION["ocarrito"]->elimina_producto($_GET["linea"]);
?>
<html>
<head>
<title> Borrar Producto </title>
</head>
<body>
<h3>Producto eliminado</h3>
<br><br><a href="index.php">Volver</a><br><br>
<a href="ver_carrito.php">Ver carrito</a>
</body>
</html>
