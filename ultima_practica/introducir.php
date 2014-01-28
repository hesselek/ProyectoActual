<?php
include('funciones.php');
ckLog();
cabecera('Bienvenido a nuestra seccion de libros');
echo "<div id=\"contenido\">\n";
echo "<h1>Elige los articulos</h1>";



if(isset($_POST['lenguajes'])&& isset($_POST['categorias'])){
	
	if(!empty($_POST['lenguajes'])&& !empty($_POST['categorias'])){
	
		$_SESSION['lenguajes'] = $_POST['lenguajes'];
		$_SESSION['categorias'] = $_POST['categorias']; 
	}
}
if(isset($_SESSION['lenguajes']) && isset($_SESSION['categorias'])){
	
		
	include('carrito2/principal.php');
		
		
		
	}else{
		echo "<div class='error'><h3>Ocurrió un error,por favor, vuelve a introducir las categorias</h3>";
		echo "<a href='entrar.php'>Volver</a>";
	}
	
 
 

echo "</div>";
pie();
?>
</body>
</html>
