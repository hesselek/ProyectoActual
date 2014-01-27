<?php
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
  <li><a href=\"index.php\">P�gina inicial</a></li>
  <li><a href=\"entrar.php\">Entrar</a></li>
  <li><a href=\"crear.php\">Asignaci�n de im�genes</a></li>
  <li><a href=\"introducir.php\">Comprar</a></li>
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
2� D.A.W. 
</address>

</div>
</body>
</html>';
}

//Como la comprobaci�n en la base de datos es solo para saber si el usuario existe, no a�adimos nada m�s
function validarUser($user,$pass){
	$dwes = new PDO("mysql:host=localhost;dbname=carritocompra", "root", "root");
	$consulta = $dwes->prepare("SELECT count(*) FROM `usuarios` WHERE `usuario`= ? and `clave`= ?");
	try{
		$consulta->execute(array($user,$pass));
		$resultado = $consulta->fetch();
	}catch(PDOException $e){echo $e->getMessage();
	}
	return $resultado[0];
	
	
}
