<?php
    session_start();
	class carrito
	{
		//atributos de la clase
		var $num_productos;
		var $array_id_prod;
		var $array_nombre_prod;
		var $array_precio_prod;
		// constructor
		function __construct()
		{
			$this->num_productos = 0;
		}
		function introduce_producto($id_producto,$nombre_prod,$precio_prod)
		{
			$this->array_id_prod[$this->num_productos]=$id_producto;
			$this->array_nombre_prod[$this->num_productos]=$nombre_prod;
			$this->array_precio_prod[$this->num_productos]=$precio_prod;
			$this->num_productos++;
		}
		//Muestra el contenido de la compra
		function imprime_carrito()
		{
			$suma = 0;
			echo "<table border='1' cellpading='3'>
				 <tr><td>Id</td><td>Nombre prducto</td><td>Precio</td><td></td></tr>";
			for($i=0;$i<$this->num_productos;$i++)
			{
				if($this->array_id_prod[$i]!=0)
				{
				//si no se ha eliminado lo muestro en el carrito
				echo "<tr>";
				echo "<td>".$this->array_id_prod[$i]."</td>";
				echo "<td>".$this->array_nombre_prod[$i]."</td>";
				echo "<td>".$this->array_precio_prod[$i]."</td>";
				echo "<td><a href='eliminar_producto.php?linea=$i'>Eliminar producto</a></td>";
				echo"</tr>";
				$suma += $this->array_precio_prod[$i];
				}
			}
			echo "<tr><td>TOTAL</td><td>".$suma."</td><td></td></tr>";
			echo "<tr><td>TOTAL+IVA</td><td>".($suma*121/100)."</td><td></td></tr>";					
			echo "</table>";	
		}
		function elimina_producto($linea)
		{
		$this->array_id_prod[$linea]=0;
		}
	}

	

if (!isset($_SESSION["oCarrito"]))
{
	$_SESSION["oCarrito"]=new carrito();
}
?>
