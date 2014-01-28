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


// y ahora, una pequeña implementacion de una clase tipo Linked List.., que me permite una mejor implementacion
// y un objeto reutilizable.

function List() {
 List.nodo = function() { 
  return {data: null, next: null}; 
 }; 
 
 this.start = null; 
 this.end = null; 
}

 List.prototype.add = function(data) { 
  if (this.start === null) { 
   this.start = List.nodo(); 
   this.end = this.start; 
  } else { 
   this.end.next = List.makeNode(); 
   this.end = this.end.next; 
  } ; 
  this.end.data = data; 
 };

 List.prototype.borrar = function(data) { 
  var current = this.start; 
  var previous = this.start; 
  while (current !== null) { 
   if (data === current.data) { 
    if (current === this.start) { 
     this.start = current.next; 
     return; 
    } 
    if (current === this.end) 
                      this.end = previous;
    previous.next = current.next; return; 
    }
    previous = current; 
    current = current.next; 
   }
 }; 

 List.prototype.insertAsFirst = function(d) { 
  var temp = List.makeNode(); 
  temp.next = this.start; 
  this.start = temp; 
  temp.data = d; 
 };
 
  function Libro(){
	 this.listaFacturas = new List();
	 this.posicion = -1;
  }
	
/*
 this.insertAfter = function(t, d) { 
  var current = this.start; 
  while (current !== null) { 
   if (current.data === t) { 
    var temp = List.makeNode();
    temp.data = d; 
    temp.next = current.next; 
    if (current === this.end) this.end = temp;
    current.next = temp; 
    return; 
   } 
   current = current.next; 
   }
  };

  this.item = function(i) { 
   var current = this.start; 
   while (current !== null) { 
    i--; 
    if (i === 0) return current; 
    current = current.next; 
   } 
   return null; 
  }; 

 this.each = function(f) {
  var current = this.start;
  while (current !== null) { 
   f(current); 
   current = current.next; 
  } 
 };
} */
var miProducto = new producto(12.3,"Esta es mi descripcion");
alert(miProducto.descripcion);
var miLineaProducto = new lineaProducto(miProducto);
