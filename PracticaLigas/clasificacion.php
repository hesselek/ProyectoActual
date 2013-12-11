<?php 
	if(!isset($_POST['liga'])){
		
		echo "<h2>Selecciona la liga</h2>
			<form action='' method='post'>";
			listarLigas();
		echo "<input type='submit' class='boton' value='Enviar' />
				</form>";
	}else{
		$clasificacion = array();
		$liga = $_POST['liga'];
		$conexion = conectarDB();
	 	mysql_select_db("db_liga");
		$query ="SELECT equipo from equipos WHERE liga='$liga'";
		
		$result = mysql_query($query);
		//if($result){
		
		while ($equipo = mysql_fetch_array($result)) {
			$clasificacion[$equipo[0]] = 0;
			$q = "Select (golesLocal-golesVisitante) from resultados where liga = '$liga' AND equipoLocal = '$equipo[0]'";
				$res = mysql_query($q);
				while($resulLocal = mysql_fetch_array($res)){
					if($resulLocal[0]>0)
						$clasificacion[$equipo[0]] = $clasificacion[$equipo[0]] + 3;
					if($resulLocal[0]==0)
						$clasificacion[$equipo[0]] = $clasificacion[$equipo[0]] + 1;
				}
				
				
		$r = "Select (golesLocal-golesVisitante) from resultados where liga = '$liga' AND equipoVisitante = '$equipo[0]'";
				$res = mysql_query($r);
				while($resulLocal = mysql_fetch_array($res)){
					if($resulLocal[0]<0)
						$clasificacion[$equipo[0]] = $clasificacion[$equipo[0]] + 3;
					if($resulLocal[0]==0)
						$clasificacion[$equipo[0]] = $clasificacion[$equipo[0]] + 1;
				}		
	
		}	

		arsort($clasificacion);
		
		
		echo "<h2>Clasificación de la liga \"$liga\"</h2>
				<table><tr><th>Equipo</th><th>Puntos</th></tr>";
		
		foreach ($clasificacion as $key => $value) {
			
			echo "<tr><td>$key</td><td>$value</td></tr>";
			
		}
		echo "</table>";
	//	}else{
		//	mysql_error();
		//}
		if(!cerrarConexion($conexion))
			echo "<h2 class='error'>Ocurrión un problema con el servidor a la hora de cerrar la conexion</h2>";
	}
	