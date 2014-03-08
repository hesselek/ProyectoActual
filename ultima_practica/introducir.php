<?php
include('funciones.php');
ckLog();
cabecera('Bienvenido a nuestra seccion de libros');
echo "<div id=\"contenido\">\n";
echo "<h1>Elige los articulos</h1>";



	
		$_SESSION['lenguajes'] = $_POST['lenguajes'];
		$_SESSION['categorias'] = $_POST['categorias']; 

	
		
	include('carrito2/principal.php');
		
		
		
	
 
 

echo "</div>";
pie();
?>
</body>
</html>
