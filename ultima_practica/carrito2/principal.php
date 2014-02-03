<?php 
include("lib_carrito.php"); 
?> 
   	<title>Carrito con B.D.</title> 
	<br />
 <?php
 //
$conexion=new mysqli();
$conexion->connect("localhost","root","root" ,"carritocompra");
//para la paginaci�n de resultados

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

 
$cadsql= "Select count(*) from libros";
if($_SESSION['lenguajes']!=0 || $_SESSION['categorias']!=0)
	$cadsql.=" WHERE ";
if($_SESSION['lenguajes']!=0)
	$cadsql.=" libros.LID =".$_SESSION['lenguajes'];
if($_SESSION['lenguajes']!=0 && $_SESSION['categorias']!=0)
	$cadsql .= " AND ";
if($_SESSION['categorias']!=0)
	$cadsql.=" libros.CATEGORIA =".$_SESSION['categorias'];

$resultado=$conexion->query($cadsql);
$salida = $resultado->fetch_array();
$num_total_registros= $salida[0];
$total_paginas=ceil($num_total_registros/$TAMANO_PAGINA);


// fin paginacion(1�parte)
$cadsql="SELECT libros.TID, autores.AUTOR, idioma.IDIOMA, libros.TITULO, categorias.nom_categoria, 
editorial.NOMBRE, libros.PRECIO, fotos.imagen,fotos.formato
FROM libros
INNER JOIN autores ON libros.ID = autores.ID
INNER JOIN idioma ON libros.LID = idioma.LID
INNER JOIN categorias ON libros.CATEGORIA = categorias.id_categoria
INNER JOIN editorial ON libros.EID = editorial.EID
LEFT JOIN fotos ON libros.TID = fotos.num_ident";

if($_SESSION['lenguajes']!=0 || $_SESSION['categorias']!=0)
	$cadsql.=" WHERE ";
if($_SESSION['lenguajes']!=0)
	$cadsql.=" libros.LID =".$_SESSION['lenguajes'];
if($_SESSION['lenguajes']!=0 && $_SESSION['categorias']!=0)
	$cadsql .= " AND ";
if($_SESSION['categorias']!=0)
	$cadsql.=" libros.CATEGORIA =".$_SESSION['categorias'];

$cadsql.= " ORDER BY autores.AUTOR, idioma.idioma, libros.TITULO ";


$cadsql.="LIMIT ".$inicio. ",".$TAMANO_PAGINA;
$resultado=$conexion->query($cadsql);


 
## mostrar en formato tabla HTML
## CABECERA
echo "<table border=2 align=center>";
echo "<tr><th colspan=7>Productos en la cesta: ".$_SESSION["ocarrito"]->num_productos."</th></tr>";
echo "<tr><td align=center>Autor</td>";
echo "<td align=center>Idioma</td>";
echo "<td align=center>Titulo</td>";
echo "<td align=center>Categoría</td>";
echo "<td align=center>Editorial</td>";
echo "<td align=center>Precio</td>";
echo "<td align=center>Imagen</td>";
echo "<td align=center>Añadir</td></tr>";
## recorrido del conjunto de resultados devuelto por la SELECT
while ($salida=$resultado->fetch_array())
{
		echo "<tr>";
	for ($i=1;$i<7;$i++)
	{
		echo "<td>".$salida[$i]."</td>";
	}
	if($salida[8]== null){
		//echo "<td>Aqui va una foto:".$salida[8]."</td>";
	}else {
		echo "<td><img src='verfoto.php?foto=".$salida[0]."'/></td>";
		//echo "<td><a href='verfoto.php?foto=".$salida[0]."'/>ver</a></td>";
	}
/*	if($registro['formato']=="image/png"){
		print "<img src='ver.php?n=".$registro['num_ident']."&v=png'><br>";
 	}else{
	  print "<img src='ver.php?n=".$registro['num_ident']."'><br>";
	}*/
	echo "<td><a href='mete_libro.php?marca=$salida[0]'>
	<img src='carrito2/images/Carrito.jpg' width=30 heigth=20></a></td>";
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
					echo "<a href=introducir.php?pagina=".$i."> ". $i ." </a>";
				
			}
			echo "</td></tr>";
		}	
	



?> 
<tr><td colspan=3 align="center"><a href="ver_carrito.php">Ver carrito </a></td>
	<td colspan=4 align="center"><a href="borrar_carrito.php">Anular compra</a></td></tr>
</table>
