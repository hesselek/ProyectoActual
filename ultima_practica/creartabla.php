<?php
#el nombre de la tabla
$base="carritocompra";
#definimos otra variable con el NOMBRE QUE QUEREMOS DAR A LA TABLA
$tabla="fotos";
# establecemos la conexión con el servidor
$conexion=mysql_connect ("localhost","pepe","pepa");
#Seleccionamos la BASE DE DATOS en la que PRETENDEMOS CREAR LA TABLA
mysql_select_db ($base, $conexion);

$crear="CREATE TABLE $tabla (";
$crear.="num_ident INT(10) ,";
$crear.="imagen BLOB NOT NULL, ";
$crear.="nombre VARCHAR(255) NOT NULL DEFAULT '',";
$crear.="tamano VARCHAR(15) NOT NULL DEFAULT  '',";
$crear.="formato VARCHAR(10) NOT NULL DEFAULT  '',";
$crear.="PRIMARY KEY (num_ident))";

#Creamos la cadena, comprobamos si esa instrucción devuelve
# VERDADERO o FALSO
# y dependiendo de ellos insertamos el mensaje de exito o fracaso

if(mysql_query ($crear ,$conexion)) {
echo "<h2> Tabla $tabla creada con EXITO </h2><br>";
    }else{
echo "<h2> La tabla $tabla NO HA PODIDO CREARSE. Ya existe</h2><br>";
exit();
};

# cerramos la conexión... y listo...

        mysql_close($conexion);

 ?>
