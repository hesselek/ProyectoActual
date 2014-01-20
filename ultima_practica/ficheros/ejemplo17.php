<?php
/* filtramos el tipo de archivos recibidos
de forma que solo se permitan imagenes en formato
jpg � gif. Si el fichero transferido tuviera formato
distinto, la funci�n exit() acabar�a la ejecuci�n del script */

if(!($_FILES['archivo']['type']=="image/jpeg" OR 
	               $_FILES['archivo']['type']=="image/gif")){
    print "El formato ".$_FILES['archivo']['type'].
	                                   " no est� permitido";
     exit();
 }else{
	            # anidamos este segundo condicional
	            # para guardar en una variable
	            # la extensi�n real del fichero
	            # mas adelante la utilizaremos
	if ($_FILES['archivo']['type']=="image/pjpeg"){
		$extension=".jpg";
	}else{
		$extension=".gif";
	}
 }
 /* filtremos ahora el tama�o de modo que no supere
 el m�ximo establecido en el hidden del formulario
 (logicamente ese valor no puede superar el valor m�ximo
 de la configuraci�n de php, pero si puede ser menor)
 y tambi�n evitaremos archivos sin contenido, 
 es decir con tama�o CERO */
if($_FILES['archivo']['size']>$_POST['lim_tamano'] 
	                             OR $_FILES['archivo']['size']==0){
 print "El tama�o ".$_FILES['archivo']['size']." excede el l�mite";
 exit();
 }

# asignemos un nombre a la imagen transferida
# de modo que se guarde en el servidor 
# con un nombre distinto, asignado por nosotros
# con ello, podemos evitar duplicidades de nombres
# ya que si existiera un fichero con el mismo nombre
# que el enviado por el cliente, se sobreescribir�a

 $nuevo_nombre="foto_abuelita";
# a�ad�mosle la extensi�n real de fichero que ten�amos recogida en la variable nuevo_nombre

 $nuevo_nombre .=$extension;
# aceptemos la transferencia siempre que el archivo tenga nombre
if ($_FILES['archivo']['tmp_name'] != "none" ){
/* con la funci�n copy
pasaremos el archivo que est� en el directorio temporal
al subdirectorio que contiene el script que estamos
ejecutando. Podr�amos incluir un path y copiarlo
a otro directorio */
           if (copy($_FILES['archivo']['tmp_name'], $nuevo_nombre)) {
	             echo "<h2>Se ha transferido el archivo</h2>"; 
		   }
    }else{
    echo "<h2>No ha podido transferirse el fichero</h2>";  
}
 
?>