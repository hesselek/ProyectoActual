<?php
    include("lib_carrito.php");
	$_SESSION["oCarrito"]->elimina_producto($_GET["linea"]);
?>
<html>
	<head>
		<title>Eliminar Producto</title>
	</head>
	<body>
		<h3>Producto Elminado</h3><br/><br/>
		<a href="index.php">Volver</a>
	</body>
</html>