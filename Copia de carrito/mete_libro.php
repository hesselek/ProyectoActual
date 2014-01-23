<?php
    include("lib_carrito.php");
   
	$conexion = new mysqli();
	$conexion->connect("localhost","root","","carritocompra");
	foreach($_POST['marca'] as $indice=>$valor){
		$sqlcad="select TITULO,PRECIO from libros where TID=".$indice;
		$resultado = $conexion->query($sqlcad);
		$salida = $resultado->fetch_array();
		$_SESSION["oCarrito"]->introduce_producto($indice,$salida['TITULO'],$salida["PRECIO"]);
	}
	$conexion->close();
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