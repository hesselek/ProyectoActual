/**
 * @author hesselek
 */


function Cliente(sDireccion, sNif, sNombre){
	this.direccion = sDireccion;
	this.nif = sNif;
	this.nombre = sNombre;
}

function Producto(dbPrecio,sDescripcion){
	this.precio = dbPrecio;
	this.descripcion =sDescripcion;
}

function Servicio(dbPrecio,sDescripcion){
	this.precio = dbPrecio;
	this.descripcion =sDescripcion;
}

function Linea(oConcepto){
	this.total = oConcepto.precio;
	this.descripcion = oConcepto.descripcion;
}

function LineaProducto (oConcepto,iUnidades) {
	Call(this,oConcepto);
	this.cantidad = iUnidades;
}

function LineaServicio(oConcepto,iUnidades) {
	Call(this,oConcepto);
}

function Factura (oCliente,iCodigo) {
	this.cliente = oCliente;
	this.codigo = iCodigo;
  
}
function Libro(){
	
}
var miProducto = new producto(12.3,"Esta es mi descripcion");
alert(miProducto.descripcion);
var miLineaProducto = new lineaProducto(miProducto);
