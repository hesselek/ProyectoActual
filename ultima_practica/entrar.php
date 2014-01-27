<?php
include('funciones.php');

//funcion que me permite saber si un usuario está logeado o no

cabecera('Seleccionar Idioma y Categoria');
echo "<div id=\"contenido\">\n";
echo "<h1>Elige las opciones</h1>";


if(!isset($_SESSION['usuario'])){
	echo"<div class='error'><h2>Debes logearte para acceder a esta página</h2></div>";
}else{
	$idiomas = getOpciones('idioma');
	$categorias = getOpciones('categorias');
 ?>
 <form action="introducir.php" method="post">
 	<label for="lenguajes">Idiomas:</label>
 	<select name="lenguajes">
 		<option value=""></option>
 		
 		<?php 
 			foreach ($idiomas as $key => $val) {
 				echo "<option value='".$val['LID']."'>".$val['IDIOMA']."</option>";
			 }
 		?>
 		<option value ="0">Todos</option>
 	</select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 	<label for="categorias">Categorías:</label>
 	<select name="categorias">
 		<option value=""></option>
 		<?php 
 			foreach ($categorias as $key => $val) {
 				echo "<option value='".$val['id_categoria']."'>".$val['nom_categoria']."</option>";
			 }
 		?>
 		<option value ="0">Todos</option>
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
