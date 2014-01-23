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
					$conexion = new mysqli();
					$conexion->connect("localhost","root","","carritocompra");
				
					$cadsql ="SELECT libros.TID, autores.AUTOR, idioma.IDIOMA, libros.TITULO, editorial.NOMBRE, libros.PRECIO
								FROM libros, autores, idioma, editorial
								WHERE libros.ID = autores.ID
								AND libros.LID = idioma.LID
								AND libros.EID = editorial.EID
								ORDER BY autores.AUTOR, idioma.IDIOMA, libros.TITULO";
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
		
	</body>
</html>
