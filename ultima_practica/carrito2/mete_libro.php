<?php
include 'lib_carrito.php';
session_start();

$conexion=new mysqli();

$conexion->connect("localhost","root","root","carritocompra");
$cadsql="select TITULO,PRECIO from libros where TID=".$_GET['marca'];
$resultado=$conexion->query($cadsql);
$salida=$resultado->fetch_array();
print_r($salida);

$_SESSION["ocarrito"]->introduce_producto($_GET['marca'],$salida["TITULO"],$salida["PRECIO"]);

$conexion->close();
?>

<html>
<head>
<title> Introducir Producto </title>
</head>
<body><script language="JavaScript">
	location.href="../introducir.php";
</script>
</body>
</html>

