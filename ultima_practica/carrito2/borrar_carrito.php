<?php
include ("lib_carrito.php");
?>
<html>
<head>
<title> Borrar carrito </title>
</head>
<body>
<h1> Compra anulada</h1>
<?php
unset($_SESSION["ocarrito"]);
?>
<br><br><a href="principal.php">Volver</a>

</body>
</html>
