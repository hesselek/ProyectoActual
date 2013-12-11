<?php

	function conectarDB(){
	   return mysql_connect ("localhost","user_liga","password"); 
	}
	
	function cerrarConexion($con){
		return mysql_close($con);
	}
	
	function comprobarDB($crear){
		$p=mysql_query("SHOW DATABASES"); 
		$numero=mysql_num_rows($p); 
	    $comprueba=false; 
		
		for ($i=0;$i<$numero;$i++) {          
    		if ($crear==mysql_db_name($p, $i)){ 
        		$comprueba=true;     
    		}; 
		} 
	/*	 if(!cerrarConexion($conexion))
		   echo "<h2> No se ha cerrado la conexi�n</h2>"; */
	
		return $comprueba;
	}
	
	function comprobarTables($conexion){
		if(comprobarDB('db_liga'))
			
		
		$tabla =  mysql_list_tables("db_liga",$conexion);
		
		if($tabla === FALSE) {
   			 die(mysql_error()); 
   
		}
		 return mysql_num_rows($tabla);
		
			
	}
	
	
	
	
	function crearDB(){
		$conexion = conectarDB();
	$crear = "db_liga";
	if(mysql_query ("CREATE DATABASE $crear")){ 
            echo "<h2> Base de datos $crear creada</h2><br>"; 
			echo "<a href='index.php'>Volver</a>";
          }else{ 
            echo "<h3 class='error'> No ha sido posible crear la base de datos $crear</h3><br>"; 
      }
		  cerrarConexion($conexion);
	}
	
	function crearTablas(){
		$conexion = conectarDB();
		mysql_select_db("db_liga",$conexion);
		$liga = "CREATE TABLE IF NOT EXISTS `ligas` (
 				 `nombre` varchar(50) NOT NULL,
  				PRIMARY KEY (`nombre`),
 				KEY `nombre` (`nombre`)
				) ENGINE=InnoDB DEFAULT CHARSET=latin1;";
		$equipos =  "CREATE TABLE IF NOT EXISTS `equipos` (
 					`liga` varchar(40) NOT NULL,
  					`equipo` varchar(40) NOT NULL,
 					 PRIMARY KEY (`liga`,`equipo`),
 					 KEY `liga` (`liga`)
				) ENGINE=InnoDB DEFAULT CHARSET=latin1;";
		
		$resultados = "CREATE TABLE IF NOT EXISTS `resultados` (
  					  `liga` varchar(40) NOT NULL,
 					  `equipoLocal` varchar(40) NOT NULL,
					  `equipoVisitante` varchar(40) NOT NULL,
					  `golesLocal` tinyint(4) NOT NULL,
 				      `golesVisitante` tinyint(4) NOT NULL,
					  PRIMARY KEY (`liga`,`equipoLocal`,`equipoVisitante`),
  					  KEY `liga` (`liga`,`equipoLocal`,`equipoVisitante`)
					  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;";
		$constraints_equipos = "ALTER TABLE `equipos`
  								   ADD CONSTRAINT `equipos_ibfk_1` FOREIGN KEY (`liga`) 
  								   REFERENCES `ligas` (`nombre`) 
  								   ON DELETE CASCADE ON UPDATE CASCADE;";
		$constraints_resultados= "ALTER TABLE `resultados`
  							   ADD CONSTRAINT `resultados_ibfk_1` FOREIGN KEY (`liga`) 
  							   REFERENCES `ligas` (`nombre`) 
  							   ON DELETE CASCADE ON UPDATE CASCADE;
  							    ADD CONSTRAINT `resultados_ibfk_2` FOREIGN KEY (`equipoLocal`) 
  							   REFERENCES `equipos` (`equipo`) 
  							   ON DELETE CASCADE ON UPDATE CASCADE;";
		if(mysql_query($liga,$conexion))
			echo "<h3>Tabla 'Ligas' Creada.</h3>";
		else
			echo "<h2 class='error'> Fallo al crear la tabla </h3>";
		if(mysql_query($equipos,$conexion))
			echo "<h3>Tabla 'Equipos' Creada.</h3>";
		else
			echo "<h2>Fallo al crear la tabla </h2>";
		if(mysql_query($resultados,$conexion))
			echo "<h3>Tabla 'Resultados' Creada.</h3>";
		else
			echo "<h2>Fallo al crear la tabla </h2>";
			
		if(mysql_query($constraints_resultados,$conexion))
			echo "<h3>Constraints añadidas a la tabla resultados.</h3>";
		else
			echo "<h3>Fallo al crear constraints en la tabla resultados </h3>";
		if(mysql_query($constraints_equipos,$conexion))
			echo "<h3>Constraints añadidas a la tabla equipos .</h3>";
		else
			echo "<h2 class='error'>Fallo al crear constraints en la tabla equipos </h2>";
	}
	function numLigas(){
			$q = "SELECT count(*) FROM ligas";
			$n = mysql_query($q);
			return mysql_fetch_row($n);
	}
	
	function nuevaLiga($nom,$equipos){
		$query = "INSERT INTO db_liga.ligas VALUES('".$nom."')";
		$conexion = conectarDB();
		$nEqAdd= 0;
		$nEqErr= 0;
		$errores = '';
		
		mysql_query($query,$conexion);
		
		if (mysql_errno($conexion)==0){
			$mensaje = "<h3>La liga <b>$nom</b> se ha añadido con éxito</h3>"; 
			
			$query ="INSERT INTO equipos (liga,equipo) VALUES('$nom',)";
			
			for($i=0;$i<sizeof($equipos);$i++){
				$query ="INSERT INTO equipos (liga,equipo) VALUES('$nom','$equipos[$i]')";
			
				if($equipos[$i]===''){
					$errores .= "<p class='error'>No se pudo añadir el equipo nº $i: Campo vacío </p>";
					$nEqErr++;
				}else{
					mysql_query($query,$conexion);
						if (mysql_errno($conexion)==0){
							$nEqAdd++;
						}else{
							$nEqErr++;	
							if (mysql_errno($conexion)==1062){
			        			$errores .=  "<p class='error'>No se pudo añadir el equipo nº $i: Ya existe un equipo con ese nombre</p"; 
			       			}else{ 
			            		$numerror=mysql_errno($conexion); 
			            		$descrerror=mysql_error($conexion); 
			            		$errores .=  "<p class='error'>Se ha producido un error nº $numerror que corresponde a: $descrerror  </p>"; 
		        			}
						} 
					}
			}
			$mensaje .= "Se han añadido $nEqAdd equipos correctamente a la liga<br />";
			if($nEqErr !=0){
				$mensaje .= "Se han producido $nEqErr errores:<br />";
				$mensaje .= $errores;
			}			
			
        }else{ 
	        if (mysql_errno($conexion)==1062){
	        	$mensaje .=  "<h2 class='error'>No se ha podido añadir la liga <b>$nom</b>. Ya existe una liga con ese nombre</h2>"; 
	        }else{ 
	            $numerror=mysql_errno($conexion); 
	            $descrerror=mysql_error($conexion); 
	            $mensaje .=  "<h2 class='error'>Se ha producido un error nº $numerror que corresponde a: $descrerror </h2>"; 
        	} 
		
		}
		
		
		
		if(!cerrarConexion($conexion))
		    $mensaje .= "Ocurrión un problema con el servidor a la hora de cerrar la conexion";
				
			header("Location: index.php?page=nuevaLiga&nombre=".$nombre."&mensaje=".$mensaje);
	}
	
	function listarLigas(){
		$conexion = conectarDB();
		mysql_select_db("db_liga");
		$query ="SELECT nombre from ligas";
		
		$consul = mysql_query($query,$conexion);
		

		while ($fila = mysql_fetch_array($consul)) {
   			echo "<input type='radio' name='liga' value=$fila[0] /><label for='liga'>$fila[0]</label>";
		}	
		
		
		if(!cerrarConexion($conexion))
			echo "Ocurrión un problema con el servidor a la hora de cerrar la conexion";
	}
	
	function listarLocal($liga){
	 	$conexion = conectarDB();
	 	mysql_select_db("db_liga");
		$query ="SELECT equipo from equipos WHERE liga='$liga'";
		$result = mysql_query($query);
		$n_max = mysql_num_rows($result);
		$n_max = mysql_num_rows($result);
		while ($fila = mysql_fetch_array($result)) {
			$q ="SELECT count(equipoLocal) from resultados WHERE liga='".$liga."' AND equipoLocal='".$fila[0]."'";
			$res = mysql_fetch_row(mysql_query($q));
			if($res[0] < $n_max-1)			
	   			echo "
	   			<input type='radio' name='equipoLocal' id='equipo' value=$fila[0] /><label for='equipo'>$fila[0]</label>
	   			";
				
		   }	
		
		
		
		if(!cerrarConexion($conexion))
			echo "<h3 class='error'>Ocurrión un problema con el servidor a la hora de cerrar la conexion</h3>";
	 }
	 
	 function listarVistiante($equipo,$liga){
	 	$conexion = conectarDB();
	 	mysql_select_db("db_liga");
		$query = "SELECT equipo
				  FROM equipos
				  WHERE liga =  '".$liga."'
				  AND equipo <>  '".$equipo."'
				  AND equipo NOT 
				  IN ( SELECT equipoVisitante
						FROM resultados
						WHERE liga =   '".$liga."'
						AND equipoLocal =  '".$equipo."'
				)";
				
		$consul = mysql_query($query,$conexion);
		

		while ($fila = mysql_fetch_array($consul)) {
   			echo "<input type='radio' name='equipoVisitante' id='equipo' value=$fila[0] /><label for='equipo'>$fila[0]</label>";
		}	
		if(!cerrarConexion($conexion))
			echo "Ocurrión un problema con el servidor a la hora de cerrar la conexion";
	 }
	 
	 function insertarResultado($liga,$equipoLocal,$equipoVisitante,$golesLocal,$golesVisitante){
	 	$conexion = conectarDB();
	 	mysql_select_db("db_liga");
		
		$query = "INSERT INTO resultados(liga,equipoLocal,equipoVisitante,golesLocal,golesVisitante)
				  Values('$liga','$equipoLocal','$equipoVisitante',$golesLocal,$golesVisitante)";
		if(mysql_query($query,$conexion)){
			echo "<h3>Se ha agregado el resultado correctamente</h3>";
		}else{
			echo mysql_error();
		}
		if(!cerrarConexion($conexion))
			echo "<h3 class='error'>Ocurrión un problema con el servidor a la hora de cerrar la conexion</h3>";
	 }
	 
	 	
	 
	
   
?>