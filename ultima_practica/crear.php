<?php
include('funciones.php');

//funcion que me permite saber si un usuario est� logeado o no

cabecera('Sube una foto');
echo "<div id=\"contenido\">\n";
echo "<h1>Elige las opciones</h1>";
//$dwes = new PDO("mysql:host=localhost;dbname=carritocompra", "root", "root");
    $conexion = new mysqli();
	$conexion->connect("localhost","root","root","carritocompra");

if(isset($_POST['libros'])){
		
	
	$foto_name= $_FILES['foto']['name'];
	$foto_size= $_FILES['foto']['size'];
	$foto_type=  $_FILES['foto']['type'];
	$foto_temporal= $_FILES['foto']['tmp_name'];
	if ($foto_type=="image/x-png" OR $foto_type=="image/png"){
		 $extension="image/png";
 	}
	if ($foto_type=="image/pjpeg" OR $foto_type=="image/jpeg"){
 			$extension="image/jpeg";
 	}
	if ($foto_type=="image/gif" OR $foto_type=="image/gif"){
 		$extension="image/gif";
 	}
	
	if ($foto_name != "" AND $foto_size != 0 AND $extension !=''){

			$f1= fopen($foto_temporal,"r+b");
			$foto_reconvertida = fread($f1, $foto_size);
			$foto_reconvertida=addslashes($foto_reconvertida);
			fclose($f1);
			//  $foto_reconvertida= mysql_escape_string($foto_reconvertida);
			  $libros = $_POST['libros'];
			 $query = "INSERT INTO fotos(num_ident, imagen, nombre, tamano, formato) VALUES ('$libros', '$foto_reconvertida','$foto_name','$foto_size','$extension')";
			; 
			 if (! $conexion->query($query)) {
    printf("Errormessage: %s\n", $conexion->error);
}
			 
		/*	$meter="INSERT INTO fotos (num_ident, imagen, nombre, tamano, formato)";
			$meter .=" VALUES(:id,:foto,:nombre,:tamano,:formato)";
			$insert = $dwes->prepare($meter);
			$insert->bindParam(':id', $_POST['libros']);
			$insert->bindParam(':foto',$foto_reconvertida,PDO::PARAM_LOB);
			$insert->bindParam(':nombre',$foto_name);
			$insert->bindParam(':tamano', $foto_size);
			$insert->bindParam(':formato', $extension);
			$insert->execute();*/
			$conexion->close();
			echo "<h2>foto subida con exito</h2>";
			echo "<div class='centrado'><a href='entrar.php'>Volver</a></div>";
	}	
}else{



if(!isset($_SESSION['usuario'])){
	echo"<div class='error'><h2>Debes logearte para acceder a esta página</h2></div>";
}else{
			
		$resultado= $conexion->query("SELECT libros.TID, libros.TITULO FROM libros WHERE libros.tID NOT IN (SELECT fotos.num_ident FROM fotos)");
		
	

	
	echo"<form ENCTYPE='multipart/form-data' method='POST' action=''>
 	Selecciona el libro
 	<select name='libros'>
 		<option value=''></option>";
 		
 			foreach ($resultado as $key => $value) {
				 echo "<option value='".$value['TID']."'>".$value['TITULO']."</option>";
			 }
 		
    echo "</select><br />
<input type='file' name='foto' /><br />
<input type='submit' name='envio' value='Enviar' />
<input type='reset' name='rest' value='Restaurar' />
</form>";
 

}
}
echo "</div>";
pie();
?>

