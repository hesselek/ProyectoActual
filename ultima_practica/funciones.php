<?php
//incluido aqui para no tener que arrastrarlo por todos los scripts
include 'carrito2/lib_carrito.php';
session_start();

if (!isset($_SESSION["ocarrito"]))
{
	$_SESSION["ocarrito"]=new carrito();
}
function cabecera($texto) 
{
    print "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?".">
<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\"
       \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">
<html xmlns=\"http://www.w3.org/1999/xhtml\">
<head>
  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=iso-8859-1\" />
  <title>Menu - $texto</title>
  <link href=\"css/miestilo.css\" rel=\"stylesheet\" type=\"text/css\" />
</head>

<body>
<div id='envoltorio'>
<div id='cabecera'>
		<div id='titulo'>
			$texto
		</div>
	</div>


<div id=\"menu\">
<ul>
   <font size=1>
  <li><a href=\"index.php\">P&aacute;gina inicial</a></li>
  <li><a href=\"entrar.php\">Entrar</a></li>
  <li><a href=\"crear.php\">Asignaci&oacute;n de im&aacute;genes</a></li>
  <li><a href=\"comprar.php\">Comprar</a></li>
  <li><a href=\"visualizar.php\">Mis pedidos</a></li>
  </font>
</ul>  
</div>


</div>";
}

function pie() 
{
    print '</div>

<div id="pie">
<address>
2&deg; D.A.W. 
</address>

</div>
</body>
</html>';
}

//funcion que me permite saber si un usuario est� logeado o no
function ckLog(){
	if(!isset($_SESSION['usuario']))
		
		header('Location: index.php'); 
}

//Recogemos el nombre de usuario y el id, que utilizaremos m�s adelante.
function validarUser($user,$pass){
	$dwes = new PDO("mysql:host=localhost;dbname=carritocompra", "root", "root");
	$consulta = $dwes->prepare("SELECT usuario, id FROM `usuarios` WHERE `usuario`= ? and `clave`= ?");
	try{
		$consulta->execute(array($user,$pass));
		$resultado = $consulta->fetch(PDO::FETCH_ASSOC);
	}catch(PDOException $e){
		echo $e->getMessage();
	}
	$dwes = null;
	
	return $resultado;
		
}
//funcion que me devuelve los lenguajes y las categorias (multiprop�sito)
function getOpciones($table){
	$dwes = new PDO("mysql:host=localhost;dbname=carritocompra", "root", "root");
	
	try{
		$consulta = $dwes->query("SELECT * from $table");
		$resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);
	}catch(PDOException $e){
		echo $e->getMessage();
	}
	$dwes = null;
	return $resultado;
		
	
}
