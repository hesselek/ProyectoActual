<?php

/*
 * Archivo donde se almacenan las funciones de la base de datos.
 */
include('db_manage.php');


/*Antes de nada, establecemos la conexión a la base de datoss*/



/*  información general de la pantalla de bienvenida. Primero comprobamos que la 
 * 	conexión se ha establecido con éxito, después que existe la base de datos, 
 *  y por último, que la base de datos contiene al menos una tabla (Es decir, que existe al menos una liga)
 */
 

 
 function main(){
 	
	 echo "<div id=\"contenido\">";
		

 	if(isset($_GET['page']))
 		$ruta = $_GET['page'];
	else
		$ruta = '';
	if(isset($_GET['golesLocal']))
		$ruta ='inserResult';
	
	switch($ruta){
		
		case 'crearDB':		
			echo "<h1>Creación de la base de datos</h1>";
			crearDB();
		break;
		case '':
			echo "<h1>Gestor de Ligas - Página principal</h1>";
			info();
		break;
		case 'crearTB':
			echo "<h1>Gestor de Ligas - Creación de las Tablas</h1>";
			crearTablas();
		break;
		case 'nuevaLiga':
			echo "<h1>Gestor de Ligas - Nueva Liga</h1>";
			echo $_GET['mensaje'];	
		break;
		case 'clasificacion':
			include('clasificacion.php');
		break;
		case 'resultados':
			echo "<h1>Gestor de Ligas - Introducir Resultados</h1>";
			include('resultados.php');
		break;
		case 'inserResult':
				insertarResultado($_GET['liga'],$_GET['equipoLocal'],$_GET['equipoVisitante'],
								$_GET['golesLocal'],$_GET['golesVisitante']);
						
						
						
								
		break; 
		default:
			echo "<h1 class='error'>Error: la página no existe</h1>";
		break;
			
	}
	echo "</div>";
 echo	"<div id=\"menu\">
<ul>
   
  <li><a href=\"index.php\">Página inicial</a></li>";
    
	$conexion = conectarDB();
	
	if(!comprobarDB("db_liga")&&(!isset($_GET['page']) || $_GET['page'] != 'crearDB')){
	  	echo "<li><a href=\"dispacher.php?p=crearDB\">Creación de la base de datos</a></li>";
	}else{
		if(comprobarTables($conexion)===0 &&(!isset($_GET['page']) || $_GET['page'] != 'crearTB')){
			echo "<li><a href=\"dispacher.php?p=crearTB\">Creación de las Tablas</a></li>";
		}else{
			 echo "<li><a href=\"dispacher.php?p=resultados\">Introducir resultados</a></li>
 			 <li><a href=\"dispacher.php?p=clasificacion\">Ver Clasificacion</a></li>";
		}
	}
  
  if(!cerrarConexion($conexion))
		   echo "<h3 class='error'> No se ha cerrado la conexión</h3>"; 
  
 
 echo "
</ul>  
</div>";
	 	
 }
 
 

function info(){
	
	
	
	$conexion = conectarDB();
	if($conexion){
		if(comprobarDB("db_liga")){
			if(comprobarTables($conexion)===0){
				print "<h2>Bienvenido al gestor de ligas.</h2>";
				print "<h3>La base de datos existe pero está vacia. ¿Quieres crear las tablas?</h3>";
				print "<li><a href=\"dispacher.php?p=crearTB\">CREACIÓN DE LA BASE DE DATOS</a></li>";
			}else{
				include('welcome.php');
			}
		}else{
			echo "<h3>La base de datos todavía no ha sido creada. Utiliza el menú de la izquierda para crearla.</h3>";
		}
	}else{
		echo "<h3 class='error'>Error: no se ha podido establecer la comunicación con la base de datos</h3>";
	}
 if(!cerrarConexion($conexion))
		   echo "<h2> No se ha cerrado la conexión</h2>";

}


function cabecera($texto) 
{
	
    print "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?".">
<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\"
       \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">
<html xmlns=\"http://www.w3.org/1999/xhtml\">
<head>
  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />
  <title>Menú - $texto</title>
  <link href=\"css/estilos.css\" rel=\"stylesheet\" type=\"text/css\" />
</head>

<body>
<div id='envoltorio'>
<div id='cabecera'>
		<div id='titulo'>
			$texto
		</div>
</div>";


}





function pie() 
{
    print '<div id="pie">
    <address>2ºD.A.W. Carlos Miguel Bernal de Matias</address>
	</div>
	</body>
	</html>';
}
