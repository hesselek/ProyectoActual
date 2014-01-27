<?php
include('funciones.php');
session_start();
cabecera('Registro de usuarios');
echo "<div id=\"contenido\">\n";
$mensaje = '';
if(isset($_GET['salir'])){
	session_destroy();
	header('Location: entrar.php'); 
}
if(isset($_POST['nombre'])){
	//do something importan about registry
	$user = validarUser($_POST['nombre'],$_POST['pass']);
	
	if($user>0)
		$_SESSION['usuario'] = $_POST['nombre'];
	else 
	  $mensaje = "Login incorrecto. El usuario no existe";
}

if(!isset($_SESSION['usuario'])){
echo "<h1>Registrate</h1>";?>
<form action="" method="post">
	<label for="nombre">Nombre:</label>
	<input type="text" placeholder="Usuario" name="nombre" autofocus="true"/><br />
	<label for="pass">Contraseña:</label>
	<input type="password" placeholder="contraseña" name="pass" /><br />
	<label for="boton"></label>
	<input type="submit" value="Entrar" />
	<div class="error"><?php echo $mensaje ?></div>
</form>

<?php 
}else{
	echo "<h1>Estas registrado como: ".$_SESSION['usuario']."</h1>";
	echo "<form action='' method='post'>";
	echo "<h2>¿Salir?</h2>";
	echo "<h3><div><a href='entrar.php?salir=yes'><div>Si</a> <a href='entrar.php'>No</a></div> <a href='index.php'>Volver</a></h3>";
	echo "</form>";
}
echo "</div>";
pie();
?>
</body>
</html>
