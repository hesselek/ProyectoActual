<?php
	include("lib_carrito.php");
?>
<html>
	
	<head>Carrito con B.D.</head>
	<body>
		
		<table border="2" align="center">
			<tr>
				<td align="center">Autor</td><td align="center">Idioma</td><td align="center">Titulo</td>
				<td align="center">Editorial</td><td align="center">Precio</td><td align="center">Añadir</td>
				<form name="comprar" method="POST" action="mete_libro.php">
		    </tr>
				<?php
				$TAMANO_PAGINA = 10;
				if(isset($_GET["pagina"]))
					$pagina = $_GET["pagina"];
				else 
				  $pagina = false;
				
				if(!$pagina){
					$pagina = 1;
					$inicio =0;
				}else{
					$inicio = ($pagina-1)*$TAMANO_PAGINA;
				}	 
				
					$conexion = new mysqli();
					$conexion->connect("localhost","root","","carritocompra");
					
					$ssql="SELECT COUNT(*) FROM LIBROS";
					$rs = $conexion->query($ssql);
					$salida = $rs->fetch_array();
					$num_total_registros= $salida[0];
					print_r($num_total_registros);
					$total_pagina = ceil($num_total_registros/$TAMANO_PAGINA);
					
					$cadsql ="SELECT libros.TID, autores.AUTOR, idioma.IDIOMA, libros.TITULO, editorial.NOMBRE, libros.PRECIO
								FROM libros, autores, idioma, editorial
								WHERE libros.ID = autores.ID
								AND libros.LID = idioma.LID
								AND libros.EID = editorial.EID
								ORDER BY autores.AUTOR, idioma.IDIOMA, libros.TITULO LIMIT $inicio,$TAMANO_PAGINA";
				$resultado = $conexion->query($cadsql);
					
				
					while($salida = $resultado->fetch_array()){
						echo "<tr>";
						for($i=1;$i<6;$i++){
							echo "<td>".$salida[$i]."</td>";
						}
						
					echo "<td><input type=checkbox name=marca[$salida[0]] value=5></td>";
						echo "</tr>";
					
					
					}
					
				?>
				<tr><td colspan="5" align="middle"><button type="submit">Añadir Selección</button></td><td><button type="reset">Eliminar</button></td></tr>	
				</form>
				
			
		</table>
		<?php
						echo "Número de registros econtrados : ".$num_total_registros;
						echo "<br /> Se muestran páginas de ".$TAMANO_PAGINA."registros cada una <br />";
						echo "Mostrando página $pagina de $total_pagina <br />";
					if($total_pagina>1){
						for ($i=1; $i<=$total_pagina;$i++){
							if($i==$pagina)
								echo $pagina;
							else
							  echo "<a href='listado_paginado.php?pagina=$i'>$i</a>";
						}
						
					}
					$conexion->close();
		
		?>
	</body>
</html>
