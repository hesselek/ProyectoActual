<?php
class carrito
{
//atributos de la clase
var $num_productos;
var $array_id_prod;
var $array_nombre_prod;
var $array_precio_prod;
var $array_cant_prod;
// constructor
function __construct()
{
$this->num_productos=0;
}
//introducir un artículo en el carrito
function introduce_producto($id_prod,$nombre_prod,$precio_prod)
{
if ($this->num_productos==0 || ! in_array($id_prod,$this->array_id_prod))
	{$this->array_id_prod[$this->num_productos]=$id_prod;
	$this->array_nombre_prod[$this->num_productos]=$nombre_prod;
	$this->array_precio_prod[$this->num_productos]=$precio_prod;
	$this->array_cant_prod[$this->num_productos]=1;
	$this->num_productos++;}
else
	{$posicion=array_search($id_prod,$this->array_id_prod);
	 $this->array_cant_prod[$posicion]++;
	
	}
}
//Muestra el contenido de la compra
function imprime_carrito()
{
$suma=0;
echo "<table border='1' cellpading='3'>
<tr><td>Nombre producto</td><td>Precio</td><td>Cantidad</td><td></td></tr>";
for ($i=0;$i<$this->num_productos;$i++)
{
if ($this->array_id_prod[$i]!=0)
// si no se ha eliminado lo muestro en el carrito
{
echo "<tr>";
echo "<td>".$this->array_nombre_prod[$i]."</td>";
echo "<td>".$this->array_precio_prod[$i]."</td>";
echo "<td>".$this->array_cant_prod[$i]."</td>";
echo "<td><a href='eliminar_producto.php?linea=$i'>Eliminar producto</td></tr>";
$suma+=$this->array_precio_prod[$i]*$this->array_cant_prod[$i];
}
}
echo "<tr><td>TOTAL</td><td>".$suma."</td><td></td></tr>";
echo "<tr><td>TOTAL+IVA</td><td>".($suma*121/100)."</td><td></td></tr>";
echo "</table>";
}
function elimina_producto($linea)
{$this->array_id_prod[$linea]=0;
}
}
if (!isset($_SESSION["ocarrito"]))
{
	$_SESSION["ocarrito"]=new carrito();
}
?>
