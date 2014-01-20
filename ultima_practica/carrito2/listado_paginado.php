<?php 
include("lib_carrito.php"); 
?> 
<html> 
<head> 
   	<title>Listado paginado</title> 
</head> 
<body> 
<?php
$TAMANO_PAGINA=10;

if (isset($_GET["pagina"]))
	$pagina=$_GET["pagina"];
else
	$pagina=false;
if (!$pagina)
	{$pagina=1;
	$inicio=0;}
else
	$inicio=($pagina-1)*$TAMANO_PAGINA;
$conexion=new mysqli();
$conexion->connect("localhost","root","" ,"carritocompra");
## OBTENER CUANTAS PAGINAS HAY PARA MOSTRAR ABAJO
$ssql="SELECT COUNT(*) FROM LIBROS";
$rs=$conexion->query($ssql);
$salida=$rs->fetch_array();
$num_total_registros=$salida[0];
##  una vez que sé el nº de registros, calculo el total paginas
$total_paginas=ceil($num_total_registros/$TAMANO_PAGINA);
$cadsql="SELECT libros.TID, autores.AUTOR, idioma.IDIOMA, libros.TITULO, editorial.NOMBRE, libros.PRECIO ";
$cadsql.="FROM libros, autores, idioma, editorial ";
$cadsql.="WHERE libros.ID = autores.ID AND libros.LID = idioma.LID AND libros.EID = editorial.EID ";
$cadsql.="ORDER BY autores.AUTOR, idioma.IDIOMA, libros.TITULO ";
$cadsql.="LIMIT ".$inicio. ",".$TAMANO_PAGINA;
$resultado=$conexion->query($cadsql);
## mostrar en formato tabla HTML
## CABECERA
echo "<table border=2 align=center>";
echo "<tr><td align=center>Autor</td>";
echo "<td align=center>Idioma</td>";
echo "<td align=center>Titulo</td>";
echo "<td align=center>Editorial</td>";
echo "<td align=center>Precio</td>";
echo "<td align=center>Añadir</td></tr>";

## recorrido del conjunto de resultados devuelto por la SELECT
while ($salida=$resultado->fetch_array())
{
	echo "<tr>";
	for ($i=1;$i<6;$i++)
	{
		echo "<td>".$salida[$i]."</td>";
	}
	
	echo "</tr>";
}
$conexion->close();
echo "</table>";
echo "Número de registros encontrados: ".$num_total_registros."<br>";
echo "Se muestran paginas de ". $TAMANO_PAGINA. " registros cada una"."<br>";
echo "Mostrando pagina ".$pagina." de ".$total_paginas."<br>";
if ($total_paginas>1)
		{for ($i=1;$i<=$total_paginas;$i++)
			{
				if ($i==$pagina)
					// Si muestro el indice de la pagina actual no pongo hipervinculo
					echo $i;
				else
					// coloco indice para ir a otra página
					echo "<a href=listado_paginado.php?pagina=".$i.">". $i ."</a>";
				
			}
		}	
	
?>

</body>
</html>



</body> 
</html>
