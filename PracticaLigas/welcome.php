<h2>Bienvenido al Gestor de ligas</h2>
<?php
$conexion = conectarDB();
if($conexion){
	$ligas = numLigas();
	if($ligas[0] === 0){
		echo "<h3>Todavía no hay ninguna liga. Puedes crear una nueva en el campo de abajo</h3>";
	}else{
		echo "<h3>Actualmente hay ".$ligas[0]." ligas. Selecciona una o intruduce una liga nueva</h3>";
	}
	
}else{
	echo "<h2 class='error'>ERROR:Imposible conectar a la base de datos</h2>";
}

 if(isset($_POST['nombreLiga'])){
 	$liga = $_POST['nombreLiga'];
	$equipos = $_POST['equipo'];
	nuevaLiga($liga,$equipos);
 }

 if(isset($_POST['liga'])&&isset($_POST['numEq'])){
 	$liga = $_POST['liga'];
	$nEq = $_POST['numEq'];
	
	if(ctype_digit($nEq)){
		echo "<form action='' method='POST'>";
		
		for($i=0;$i<$nEq;$i++){
			$j = $i+1;
			echo "<label for='equipo_id' id='label_eq'>Equipo nº $j:</label><input type='text' name='equipo[]' id='equipo_id' />";
		}			
		
		echo "	<input type='hidden' value=$liga name='nombreLiga' />
				<div style='clear:both'></div>
				<input type='submit' class='boton' value='Enviar' />
			  
			  </form>";
		
	}else{
		echo "<h2 class='error'>ERROR: el dato introducido no es un número válido</h2>
					  <a href='index.php'>Volver</a>";
	}
	
}else{
	if(!isset($_POST['liga'])){
	echo "
	<form action='' method='POST'>
	<label for='liga'>Nombre de la liga:</label><input type='text' name='liga' id='liga' />
	<div style='clear:both;'></div>
	<label for='numEq'>Número de equipos:</label><input type ='text' name='numEq' id='numEq' />
		<div style='clear:both;'></div>
	<input type='submit' class='boton' value='Enviar' />
	
	</form>";
	}else{
	echo "<h2 class='error'>ERROR:Rellene todos los campos del formulario</h2>
		  <a href='index.php'>Volver</a>";
	
	}
	
}