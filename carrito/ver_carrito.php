
<html>
	<head>
		<title>Ver Carrito</title>
	</head>
	<body>
		
		<?php
  		  include("lib_carrito.php");
		$_SESSION["oCarrito"]->imprime_carrito();
		?>
		<a href="index.php">Volver</a>
		<a href="ver_carrito.php"></a>
	</body>
</html>