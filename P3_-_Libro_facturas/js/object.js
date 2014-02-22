/**
 * @author hesselek
 */

var total_del_todo = 0;
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

function Linea(sDescripcion){
	this.descripcion = sDescripcion;
	this.total = 0;
}

function LineaProducto(sDescripcion,dbPrecio,iUnidades) {
	Linea.call(this,sDescripcion);
	this.dbPrecio = dbPrecio;
	this.cantidad = iUnidades;
	this.total = iUnidades*dbPrecio;
}

LineaProducto.prototype = new Linea;

function LineaServicio(sDescripcion,dbPrecio) {
	Linea.call(this,sDescripcion);
	this.dbPrecio = dbPrecio;
	this.total = dbPrecio;
}

LineaServicio.prototype = new Linea;

function Factura (oCliente,iCodigo) {
	this.cliente = oCliente;
	this.codigo = iCodigo;
	this.lineaFactura = new List();
	var fecha2 = new Date();
	 fecha2.getDate();
	this.fecha = fecha2.toLocaleDateString();
  
}
Factura.prototype.Total = function () {
	var total = 0;
	var lin = this.lineaFactura.start;
  while(lin !=null){
		total += parseFloat(lin.data.total);
		lin = lin.next;
	}
	return total;

};

Factura.prototype.Iva = function  () {
	return this.Total()*21/100;
  
};

Factura.prototype.TotalIva = function(){
	return this.Total() + this.Iva();
};

function Libro(){
	 this.listaFacturas = new List();
	 this.posicion = -1;
  }
  
  Libro.prototype.codigoFactura = function(){
  	this.posicion = this.posicion +1;
  	return this.posicion;
  };
  
  Libro.prototype.generarListadoSimple = function () {
  	/*
  	 * Esta función genera un tbody que puede ser enganchado en cualquier tabla...
  	 */
  	var body  = document.createElement("tbody");
  	
  	var factura = this.listaFacturas.start;
	total_del_todo = 0;
	while(factura != null){
	
		var fila = body.insertRow(-1);
		fila.insertCell(0).textContent = factura.data.codigo; 
		fila.insertCell(1).textContent = factura.data.cliente.nombre;
		fila.insertCell(2).textContent = factura.data.cliente.nif;
		fila.insertCell(3).textContent = factura.data.Total();
	
		total_del_todo = total_del_todo + factura.data.Total();
			factura = factura.next;
	}
	
	return body;
    
  };
  
 /* Para esta funcion, creo una tabla entera, y me dejo de complicaciones */ 
  
  Libro.prototype.generarListadoAgrupado = function () {
  	var body  = document.createElement("tbody");


	/*
	 * El hecho de que javascript pase todo por referencia me ha obligado a crear esta mierda de apaño;
	 * deberia añadirlo al prototipo de la lista pero paso. Realmente, paso.
	 */
  	var lista = new List();
  	var temp =	miLibro.listaFacturas.start;
  	
  	while(temp != null){
  		lista.add(temp.data);
  		temp = temp.next;
  	}
  	
  
  	
	
  	var factura = lista.start;
  	var cliente = null;
	
  	while(factura != null){
  		total_del_todo=0;
  		cliente = factura.data.cliente;
  		var fila = body.insertRow(-1);
  		fila.insertCell(0).textContent = "Nombre:";
		fila.insertCell(1).textContent = cliente.nombre;
		fila.insertCell(2).textContent = "Nif:";
		fila.insertCell(3).textContent = cliente.nif;
		
		fila = body.insertRow(-1);
		
		fila.insertCell(0).texContent = "";
  		fila.insertCell(1).textContent = "Codigo de Factura:";
		fila.insertCell(2).textContent = "Fecha:";
		fila.insertCell(3).textContent = "Importe:";
		
  		while(factura != null){
  			if(cliente === factura.data.cliente){
  				fila = body.insertRow(-1);	
  				fila.insertCell(0).texContent = "";
  				fila.insertCell(1).textContent = factura.data.codigo;
				fila.insertCell(2).textContent = factura.data.fecha;
				fila.insertCell(3).textContent = factura.data.Total();
  				total_del_todo += factura.data.Total();
  				lista.borrar(factura.data);
  			}
  			
  		
  			factura = factura.next;
  		}
  		fila = body.insertRow(-1);	
  				fila.insertCell(0).texContent = "";
  				fila.insertCell(1).textContent = "";
				fila.insertCell(2).textContent = "Total:";
				fila.insertCell(3).textContent = total_del_todo;
  		factura = lista.start;
  	}
  	return body;
  };
/*
 *   He creado lo que sería la implementación de una Linked List en javascript, lo que me va a permitir
 *   una manera más sencilla de acceder a los objetos que, de otra manera, se almacenarían en un array.
 *   Además, de esta forma, no hay que escribir funciones para añadir o borrar clientes y líneas a las facturas,
 * 	 ni facturas al libro, ya que estas funciones son parte del objeto List.  
 */

function List() {
 List.nodo = function() { 
  return {data: null, next: null, prev:null}; 
 }; 
 
 this.start = null; 
 this.end = null; 
}

 List.prototype.add = function(data) { 
  if (this.start === null) { 
   this.start = List.nodo(); 
   this.end = this.start; 
  
  } else { 
  	this.end.next = List.nodo();
  	this.prev = List.nodo(); 
  	this.prev = this.end;
    
   this.end = this.end.next; 
  }; 
  this.end.data = data; 
  this.end.prev = this.prev;
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
  var temp = List.node(); 
  temp.next = this.start; 
  this.start = temp; 
  temp.data = d; 
 };
 
  
	
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
} 
*/
