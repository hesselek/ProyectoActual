<?php
/* filtramos el tipo de archivos recibidos
de forma que solo se permitan imagenes en formato
jpg ó gif. Si el fichero transferido tuviera formato
distinto, la función exit() acabaría la ejecución del script */

if(!($_FILES['archivo']['type']=="image/jpeg" OR 
	               $_FILES['archivo']['type']=="image/gif")){
    print "El formato ".$_FILES['archivo']['type'].
	                                   " no está permitido";
     exit();
 }else{
	            # anidamos este segundo condicional
	            # para guardar en una variable
	            # la extensión real del fichero
	            # mas adelante la utilizaremos
	if ($_FILES['archivo']['type']=="image/pjpeg"){
		$extension=".jpg";
	}else{
		$extension=".gif";
	}
 }
 /* filtremos ahora el tamaño de modo que no supere
 el máximo establecido en el hidden del formulario
 (logicamente ese valor no puede superar el valor máximo
 de la configuración de php, pero si puede ser menor)
 y también evitaremos archivos sin contenido, 
 es decir con tamaño CERO */
if($_FILES['archivo']['size']>$_POST['lim_tamano'] 
	                             OR $_FILES['archivo']['size']==0){
 print "El tamaño ".$_FILES['archivo']['size']." excede el límite";
 exit();
 }

# asignemos un nombre a la imagen transferida
# de modo que se guarde en el servidor 
# con un nombre distinto, asignado por nosotros
# con ello, podemos evitar duplicidades de nombres
# ya que si existiera un fichero con el mismo nombre
# que el enviado por el cliente, se sobreescribiría

 $nuevo_nombre="foto_abuelita";
# añadámosle la extensión real de fichero que teníamos recogida en la variable nuevo_nombre

 $nuevo_nombre .=$extension;
# aceptemos la transferencia siempre que el archivo tenga nombre
if ($_FILES['archivo']['tmp_name'] != "none" ){
/* con la función copy
pasaremos el archivo que está en el directorio temporal
al subdirectorio que contiene el script que estamos
ejecutando. Podríamos incluir un path y copiarlo
a otro directorio */
           if (copy($_FILES['archivo']['tmp_name'], $nuevo_nombre)) {
	             echo "<h2>Se ha transferido el archivo</h2>"; 
		   }
    }else{
    echo "<h2>No ha podido transferirse el fichero</h2>";  
}
 
?>