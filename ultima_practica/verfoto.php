<?php
$numero=$_REQUEST['foto'];
$tabla="fotos";
$conexion=mysql_connect ("localhost","root","root");
mysql_select_db ("carritocompra", $conexion);
    $sacar = "SELECT * FROM ".$tabla." WHERE (num_ident=$numero)" ;
    $resultado = mysql_query($sacar,$conexion);
while ($registro = mysql_fetch_array($resultado)){
            $tipo_foto=$registro['formato'];
             header("Content-type: $tipo_foto");
             echo $registro['imagen'];
}
mysql_close();

?>