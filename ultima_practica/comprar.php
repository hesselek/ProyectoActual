<?php
include('funciones.php');

//funcion que me permite saber si un usuario est� logeado o no

cabecera('Seleccionar Idioma y Categoria');
echo "<div id=\"contenido\">\n";
echo "<h1>Elige las opciones</h1>";


if(!isset($_SESSION['usuario'])){
	echo"<div class='error'><h2>Debes logearte para acceder a esta p�gina</h2></div>";
}else{
	$_SESSION['lenguajes'] = 0;
	$_SESSION['categorias'] = 0;	
	$idiomas = getOpciones('idioma');
	$categorias = getOpciones('categorias');
 ?>
 <form action="introducir.php" method="post">
 	<label for="lenguajes">Idiomas:</label>
 	<select name="lenguajes">
 		<option value="0">Todos</option>
 		
 		<?php 
 			foreach ($idiomas as $key => $val) {
 				echo "<option value='".$val['LID']."'>".$val['IDIOMA']."</option>";
			 }
 		?>
 		
 	</select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 	
 	<label for="categorias">Categor&iacute;as:</label>
 	<select name="categorias">
 		<option value="0">Todos</option>
 		<?php 
 			foreach ($categorias as $key => $val) {
 				echo "<option value='".$val['id_categoria']."'>".$val['nom_categoria']."</option>";
			 }
 		?>
 		
 	</select><br />
 	
 	<input type="submit" value="Enviar" />
 </form>


<?php
}
echo "</div>";
pie();
?>
</body>
</html>
