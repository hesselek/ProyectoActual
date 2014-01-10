<?php
    include("lib_carrito.php");
	$_SESSION["oCarrito"]->introduce_producto($_GET["id"],$_GET["nombre"],$_GET["precio"]);
	foreach($_POST['marca'] as $indice=>$valor){
		echo "<p>".$indice.$valor."</td>";
	}
?>
<html>
	<head>
		<title>Introduce Productos</title>
	</head>
	<body>
		<h3>Producto Introducido</h3><br/><br/>
		<a href="index.php">Volver</a>
		<a href="ver_carrito.php"></a>
	</body>
</html>