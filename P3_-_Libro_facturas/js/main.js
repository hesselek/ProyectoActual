

var miLibro = null;// = new Libro();
var flStado = null;
var current_factura = null;
var current_cliente = null;




function start () {
  initializeData();
  initializeEvents();
  status();
 
}

function CargarLista(lista){
	var select = document.getElementById('selectProd');
	var itemSelect = lista.start;
	var option;
	while ( select.childNodes.length >= 1 )
    {
        select.removeChild(select.firstChild);       
    }
	
	while(itemSelect !=null){
		
		
		option = document.createElement('option');
   		option.value=itemSelect.data.precio;
    	option.text=itemSelect.data.descripcion;
    	select.appendChild(option);
		//select.appendChild(option);
		itemSelect = itemSelect.next;
	}
	
}
function status(){
	switch(flStado){
		case 0:
			Bloquear('cabecera',true);
			Bloquear('linea',true);
			Bloquear('validarFactura');
			Bloquear('listar');
			break;
		
		case 1:
			Bloquear('linea',true);
			Bloquear('validarFactura');
			Bloquear('listar');
			Desbloquear('cabecera');
			break;
		case 2:
			Bloquear('cabecera',false);
			Bloquear('listar',false);
			Desbloquear('linea');
			Desbloquear('validarFactura');
			document.getElementById('totalLinea').disabled= true;
			break;
		case 3:
			Bloquear('cabecera',true);
			Bloquear('linea',true);
			Bloquear('linea');
			Desbloquear('listar');
			break;
	}
	
	}
function Desbloquear (formulario) {
  var form2 = document.getElementById(formulario);
  for (i=0;i<form2.elements.length;i++)
	{
		if(form2.elements[i].id != 'codigo' || form2.elements[i].id != 'fecha' )
			form2.elements[i].disabled=false;
	}
}

function Bloquear(formulario,limpiar){
	
	var form1 = document.getElementById(formulario);
	
	for (i=0;i<form1.elements.length;i++)
	{
		
		form1.elements[i].disabled = true;
		if(limpiar && form1.elements[i].type =='text')
			form1.elements[i].value = '';
		if(form1.elements[i].type=='radio')
			//form1.elements[i].checked=false;
		if(form1.elements[i].type=='select'){
			var selNodo = form1.elements[i];
			while (selNodo.firstChild) {
    			selNodo.removeChild(myNode.firstChild);
			}
		}
		
	}
	var Parent = document.getElementById('tabla');
	while(Parent.hasChildNodes())
	{
   		Parent.removeChild(Parent.firstChild);
	}

}

/**
 *******************************************************************
 * *****************FUNCIONES ASOCIADAS A BOTONES*******************
 * ****************************************************************
 */

function envCabecera(e){
	//TODO: validación del formulario cabecera...
	flStado = 2;
	status();
	current_cliente = new Cliente(
									document.getElementById('direccion').value,
									document.getElementById('nif').value,
									document.getElementById('nombre').value
								 );
	current_factura = new Factura(current_cliente,miLibro.posicion);
	
}

function envFactura(){
	miLibro.listaFacturas.add(current_factura);
	alert('Factura agregada');
	flStado = 0;
	document.getElementById('nuevaFactura').removeEventListener("click",errorFacturaNueva,false);
	document.getElementById('nuevaFactura').addEventListener("click",NuevaFactura,false);
	status();
	
}

function canFactura(e){
	current_factura =  null;
	flStado = 0;
	document.getElementById('nuevaFactura').removeEventListener("click",errorFacturaNueva,false);
	document.getElementById('nuevaFactura').addEventListener("click",NuevaFactura,false);
	status();
}

function first(){
	
	current_factura = miLibro.listaFacturas.start;
	rellenarCampos();
}

function rellenarCampos(){
	document.getElementById('codigo').value = current_factura.data.codigo;
	document.getElementById('fecha').value = current_factura.data.fecha;
	document.getElementById('direccion').value = current_factura.data.cliente.direccion;
	document.getElementById('nif').value = current_factura.data.cliente.nif;
	document.getElementById('nombre').value = current_factura.data.cliente.nombre;
	var lineas_facturas = current_factura.data.lineaFactura;
	var lin = lineas_facturas.start;
  	while(lin !=null){
		insertarLinetaTabla(lin.data.descripcion,lin.data.precio,lin.data.unidades,lin.data.total,document.getElementById('tabla'));
		lin = lin.next;
	}
	
	document.getElementById('total').value =  current_factura.data.Total();
	document.getElementById('iva').value =  current_factura.data.Iva();
	document.getElementById('totalIva').value = current_factura.data.TotalIva();

	
}

function previous(){
	current_factura = miLibro.listaFacturas.prev;
	rellenarCampos();
}

function next(){
	current_factura = miLibro.listaFacturas.next;
	rellenarCampos();
}

function last(){
	current_factura = miLibro.listaFacturas.end;
	rellenarCampos();
}

function insLinea () {
	
	var prod = document.getElementById('selectProd');
	var product = prod[prod.selectedIndex].text;
	var pre = document.getElementById('selectProd').value;
	var uni = document.getElementById('unidades').value;
	var tot = document.getElementById('totalLinea').value;
	
	if(document.getElementById('r_servicios').checked == true)
		var linea = new LineaServicio(product,pre);
	else
		var linea = new LineaProducto(product,pre,uni);
		current_factura.lineaFactura.add(linea);
		insertarLinetaTabla(product,pre,uni,tot,document.getElementById('tabla'));
		  
}

function insertarLinetaTabla(product,pre,uni,tot,tabla) {
  var miTabla = tabla;
	if(miTabla.rows.length == 0)
		CrearTabla(miTabla);
	
	var fila = miTabla.insertRow(-1);
	fila.insertCell(0).textContent = product; 
	fila.insertCell(1).textContent = pre;
	fila.insertCell(2).textContent = uni;
	fila.insertCell(3).textContent = tot;
	
	
	ActualizarTotal();

}

function NuevaFactura(){
	flStado = 1;
	status();
	var fecha = new Date();
	fecha.getDate();
	document.getElementById('codigo').value = miLibro.codigoFactura();
	document.getElementById('fecha').value = fecha.toLocaleDateString();
	document.getElementById('nuevaFactura').removeEventListener("click",NuevaFactura,false);
	document.getElementById('nuevaFactura').addEventListener("click",errorFacturaNueva,false);
	//document.getElementById('codigo').value
}

function ActualizarTotal(){
	document.getElementById('total').value =  current_factura.data.Total();
	document.getElementById('iva').value =  current_factura.data.Iva();
	document.getElementById('totalIva').value = current_factura.data.TotalIva();
}

function errorFacturaNueva(){
		alert('No puedes crear una nueva factura mientras estás editando una. ');
}

function Navegar () {
  flStado = 3;
  status();
  first();
}

function Salir (){
	
}

function ListadoSimple () {
	var listadoSimple = window.open('listado.htm');
}

function ListadoAgrupado(){
	alert('hola, soy el listado agrupado');
}

//como el paso de crear varias tablas lo vamos a utilizar muchas veces, lo he externalizado...
function CrearTabla(oTabla){
	var oTHead = document.createElement("thead");
	var oFila = oTHead.insertRow(0);
	oFila.insertCell(0).textContent = "Descripcion";
	oFila.insertCell(1).textContent = "Precio";
	oFila.insertCell(2).textContent = "Unidades";
	oFila.insertCell(3).textContent = "Total Linea";
	oTabla.appendChild(oTHead);
	 
	var oTBody = document.createElement("tbody");
	oTabla.appendChild(oTBody);
}



window.onload = start;


