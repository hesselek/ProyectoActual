

var miLibro = null;//new Libro();
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

function envFactura(e){
	var nodo = e.target;
	alert('Hola, soy el boton '+nodo.id);
}

function canFactura(e){
	var nodo = e.target;
	alert('Hola, soy el boton '+nodo.id);
}

function first(e){
	var nodo = e.target;
	alert('Hola, soy el boton '+nodo.id);
}

function previous(e){
	var nodo = e.target;
	alert('Hola, soy el boton '+nodo.id);
}

function next(e){
	var nodo = e.target;
	alert('Hola, soy el boton '+nodo.id);
}

function last(e){
	var nodo = e.target;
	alert('Hola, soy el boton '+nodo.id);
}

function insLinea () {
	var miTabla = document.getElementById('tabla');
	if(miTabla.rows.length == 0)
		CrearTabla(miTabla);
	
	var fila = miTabla.insertRow(0);
	fila.
	  
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

function errorFacturaNueva(){
		alert('No puedes crear una nueva factura mientras estás editando una. ');
}

function Navegar () {
  alert('Hola, soy el botón de navegar');
}

function Salir (){
	alert('Hola, soy el botón salir');
}

function ListadoSimple () {
	alert('hola, soy el listado simple');
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
