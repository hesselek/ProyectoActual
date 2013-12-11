


<?php
	if(!isset($_POST['liga'])){
		
		echo "<h2>Selecciona la liga</h2>
			<form action='' method='post'>";
			listarLigas();
			
		echo "<div style='clear:both;'></div><input type='submit'class='boton' value='Enviar' />
				</form>";
	}else if(!isset($_POST['equipoLocal'])){
		echo "<h2>Selecciona el equipo local</h2>
			 <form action='' method='post'>";
			 listarLocal($_POST['liga']);
			 
		echo "  <input type='hidden' name='liga' value='".$_POST['liga']."' />
		<div style='clear:both;'></div>
				<input type='submit' class='boton' value='Enviar' />
				</form>";
	}else if(!isset($_POST['equipoVisitante'])){
	
		echo "<h2>Selecciona el equipo visitante</h2>
			 <form action='' method='post'>";
			 listarVistiante($_POST['equipoLocal'],$_POST['liga']); 
		echo"<div style='clear:both'></div>
		<input type='hidden' name='liga' value='".$_POST['liga']."' />
			  <input type='hidden' name='equipoLocal' value='".$_POST['equipoLocal']."' />
				<input type='submit' class='boton' value='Enviar' />
				</form>";
	}else{

	echo "<h2>Introduce el resultado</h2>
	<form action='index.php?page=mundo&' method='get'>
			<label for='golesLocal' class='goles'>Goles Equipo Local:</label><input type='text' name='golesLocal' />
			<div style='clear:both'></div>
			<label for='golesVisitante' class='goles'>Goles Equipo Visitante:</label><input type='text' name='golesVisitante' />
			
<div style='clear:both'></div>
	     
	    <input type='hidden' name='liga' value='".$_POST['liga']."' />
	          <input type='hidden' name='equipoVisitante' value='".$_POST['equipoVisitante']."' />
			  <input type='hidden' name='equipoLocal' value='".$_POST['equipoLocal']."' />
				<input type='submit' class='boton' value='Enviar' />
				</form>";
				
	}
	