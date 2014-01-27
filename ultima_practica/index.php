<?php
include('funciones.php');

cabecera('Libreria On-line');
echo "<div id=\"contenido\">\n";
echo "<h1>Bienvenidos - Libreria On Line</h1>";
$mensaje = null;

if(isset($_GET['salir'])){
	session_destroy();
	header('Location: index.php'); 
}

if(isset($_POST['nombre'])){
	//do something importan about registry
	$user = validarUser($_POST['nombre'],$_POST['pass']);
	
	
	if($user>0){
		$_SESSION['usuario'] = $user['usuario'];
		$_SESSION['id'] = $user['id'];
		
		header('Location: entrar.php'); 
	}	
	else
	{ 
	  $mensaje = "Login incorrecto. El usuario no existe";
	}
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
	<?php if($mensaje !=null)
		echo "<div class='error'><?php echo $mensaje</div>";
	?>
</form>

<?php 
}else{
	echo "<h1>Estas registrado como: ".$_SESSION['usuario']."</h1>";
	echo "<form action='' method='post'>";
	echo "<h2>¿Salir?</h2>";
	echo "<h3><div><a href='index.php?salir=yes'><div>Si</a> <a href='entrar.php'>No</a></div> <a href='entrar.php'>Volver</a></h3>";
	echo "</form>";
}
echo "</div>";
pie();
?>
</body>
</html>
