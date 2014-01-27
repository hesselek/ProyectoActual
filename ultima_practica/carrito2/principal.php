<?php 
include("lib_carrito.php"); 
?> 
<html> 
<head> 
   	<title>Carrito con B.D.</title> 
</head> 
<body> 
	<h1>Hola mundo</h1>
 <?php
$conexion=new mysqli();
$conexion->connect("localhost","root","root" ,"carritocompra");
//para la paginación de resultados

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

## OBTENER CUANTAS PAGINAS HAY PARA MOSTRAR ABAJO
$ssql="SELECT COUNT(*) FROM libros";
$rs=$conexion->query($ssql);
 
$salida=$rs->fetch_array();
$num_total_registros=$salida[0];

##  una vez que sé el nº de registros, calculo el total paginas
$total_paginas=ceil($num_total_registros/$TAMANO_PAGINA);
// fin paginacion(1ªparte)
$cadsql="SELECT libros.TID, autores.AUTOR, idioma.IDIOMA, libros.TITULO, editorial.NOMBRE, libros.PRECIO ";
$cadsql.="FROM libros, autores, idioma, editorial ";
$cadsql.="WHERE libros.ID = autores.ID AND libros.LID = idioma.LID AND libros.EID = editorial.EID ";
$cadsql.="ORDER BY autores.AUTOR, idioma.IDIOMA, libros.TITULO ";
$cadsql.="LIMIT ".$inicio. ",".$TAMANO_PAGINA;
$resultado=$conexion->query($cadsql);
printf("Errormessage: %s\n", $conexion->error);
## mostrar en formato tabla HTML
## CABECERA
echo "<table border=2 align=center>";
echo "<tr><th colspan=6>Productos en la cesta: ".$_SESSION["ocarrito"]->num_productos."</th></tr>";
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
	echo "<td><a href='mete_libro.php?marca=$salida[0]'>
	<img src='carrito.jpg' width=30 heigth=20></a></td>";
	echo "</tr>";
}

$conexion->close();
echo "<tr><td colspan=2>Número de registros encontrados: ".$num_total_registros."</td>";
echo "<td>Se muestran paginas de ". $TAMANO_PAGINA. " registros cada una"."<br>";
echo "Mostrando pagina ".$pagina." de ".$total_paginas."</td>";
echo "<td colspan=3 align='center'>";
if ($total_paginas>1)
		{for ($i=1;$i<=$total_paginas;$i++)
			{
				if ($i==$pagina)
					// Si muestro el indice de la pagina actual no pongo hipervinculo
					echo $i;
				else
					// coloco indice para ir a otra página
					echo "<a href=principal.php?pagina=".$i."> ". $i ." </a>";
				
			}
			echo "</td></tr>";
		}	
	



?> 
<tr><td colspan=3 align="center"><a href="ver_carrito.php">Ver carrito </a></td>
	<td colspan=3 align="center"><a href="borrar_carrito.php">Anular compra</a></td></tr>
</table>
</body>
</html>
