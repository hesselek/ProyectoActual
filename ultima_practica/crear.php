<?php
include('funciones.php');

//funcion que me permite saber si un usuario est� logeado o no

cabecera('Seleccionar Idioma y Categoria');
echo "<div id=\"contenido\">\n";
echo "<h1>Elige las opciones</h1>";
$dwes = new PDO("mysql:host=localhost;dbname=carritocompra", "root", "root");


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

			$f1= fopen($foto_temporal,"rb");
			$foto_reconvertida = fread($f1, $foto_size);
			$foto_reconvertida=addslashes($foto_reconvertida);
			
			$meter="INSERT INTO fotos (num_ident, imagen, nombre, tamano, formato) ";
			$meter .=" VALUES(:id,:foto,:nombre,:tamano,:formato)";
			$insert = $dwes->prepare($meter);
			$insert->bindParam(':id', $_POST['libros']);
			$insert->bindParam(':foto',$foto_reconvertida);
			$insert->bindParam(':nombre',$foto_name);
			$insert->bindParam(':tamano', $foto_size);
			$insert->bindParam(':formato', $extension);
			$insert->execute();
			echo "<h2>foto subida con exito</h2>";
	}	
}else{



if(!isset($_SESSION['usuario'])){
	echo"<div class='error'><h2>Debes logearte para acceder a esta página</h2></div>";
}else{
		
	try{
		$consulta = $dwes->query("SELECT libros.ID, libros.TITULO FROM libros WHERE libros.ID NOT IN (SELECT fotos.num_ident FROM fotos)");
		$resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);
	}catch(PDOException $e){
		echo $e->getMessage();
	}
	$dwes = null;
	
	echo"<form ENCTYPE='multipart/form-data' method='POST' action=''>
 	Selecciona el libro
 	<select name='libros'>
 		<option value=''></option>";
 		
 			foreach ($resultado as $key => $value) {
				 echo "<option value='".$value[ID]."'>".$value['TITULO']."</option>";
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
</body>
</html>
