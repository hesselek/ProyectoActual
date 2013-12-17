<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
	<head>
		<meta content="text/html; charset=UTF-8" http-equiv="Content-type" />
		<title>Generación de Nocicias Página principal</title>
		<link href="estilo.css" rel="stylesheet" type="text/css" />
	</head>

	<body>
		<?php if(!isset($_SESSION['user'])){ ?>
		<h1 style="text-align: center">Gestion de Noticias - Página Principal</h1>
		<br/>
		<p class="parrafocentrado">
			
			Esta zona tiene acceso restringido.<br />
			Para entrar debe identificarse
			
		</p>
		
		<form class="entrada">
			<p>
				<label for="nombre">Usuario</label>
				<input type="text" name="nombre" />
			</p>
			<p>
				<label for="clave">Clave</label>
				<input type="text" name="clave" />
			</p>
			<input type="submit" value="Enviar" />
		</form>
		<p class="parrafocentrado">
		
				Nota: si no disponde de identificación o tiene problemas para entrar <br />
				póngase en contacto con el <a href="mailto:hessele@gmail.com">administrador</a> del sitio
			
		</p>
	<?php } else { 
		if(isset($_POST['nombre'])AND isset($_POST['clave'])){
			//TODO: 
		}	else {
	?>
		<h1>Gestión de noticias</h1>
		<hr />
		<ul>
			<li><a href="#">Consultar noticias</a></li>
			<li><a href="#">Insertar nueva noticia</a></li>
			<li><a href="#">Eliminar noticias</a></li>
		</ul>
		<hr />
		[ <a href="#">Desconectar</a> ]
	<?php }} ?>
	</body>
</html>
