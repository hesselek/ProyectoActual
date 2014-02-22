var miLibro = null;// = new Libro();
var flStado = null;
var current_factura = null;
var current_cliente = null;
var tabla = null;
var navegacion = null;


function start () {
  initializeData();
  initializeEvents();
  status();
  tabla = document.getElementById("tabla");
  CrearTabla(tabla);
 
}

function CargarLista(lista,mensaje){
	var select = document.getElementById('selectProd');
	var itemSelect = lista.start;
	var option;
	while ( select.childNodes.length >= 1 )
    {
        select.removeChild(select.firstChild);       
    }
	option = document.createElement('option');
	
	/*
	 * Introducimos un elemento 0 para evitar inconsistencias
	 */
	option.value = 0;
	
	option.text = mensaje;
	select.appendChild(option);
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
			Bloquear('cabecera',true);
			Desbloquear('cabecera');
			borrarTabla();
			break;
		case 2:
			Bloquear('cabecera',false);
			Bloquear('listar',false);
			Bloquear('linea',true);
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
			form1.elements[i].checked=false;
		if(form1.elements[i].type=='select-one'){
			var select = form1.elements[i];
		
			while ( select.childNodes.length >= 1 )
   			 {
       		 select.removeChild(select.firstChild);       
    		}
		}
		
	}
}

/*
 * Método para no tener que estar creando la tabla continuamente. 
 * Borramos todas las filas menos la cabecera. 
 */
function borrarTabla(){
	for(var i = tabla.rows.length - 1; i > 0; i--)
	{
    tabla.deleteRow(i);
	}
}

/**
 *******************************************************************
 * *****************FUNCIONES ASOCIADAS A BOTONES*******************
 * ****************************************************************
 */

function envCabecera(e){

	var direccion = document.getElementById('direccion');
	var nif = document.getElementById('nif');
	var nombre = document.getElementById('nombre');
	var validar = true;

	if(direccion.value==""){
		validar = false;
		alert("Debes rellenar todos los campos");
		direccion.focus();	
	}else{
		 if(nif.value==""){
			validar = false;
			alert("Debes rellenar todos los campos");
			nif.focus();	
		}else{
			if(nombre.value==""){
				validar = false;
				alert("Debes rellenar todos los campos");	
				nombre.focus();
			}
		}
		
	}
	var reg = /[0-9]{8}[A-Za-z]/;
	
	if (!nif.value.match(reg)){
		alert("El nif no es correcto");
		nif.focus();
		validar = false;
	}
	
	
	if(validar){
		flStado = 2;
		status();
		current_cliente = new Cliente(direccion.value,nif.value,nombre.value);
		current_factura = new Factura(current_cliente,miLibro.posicion);
	}
	
}

function envFactura(){
	miLibro.listaFacturas.add(current_factura);
	alert('Factura agregada');
	flStado = 0;
	unlock();
	status();
	
}

function canFactura(e){
	current_factura =  null;
	flStado = 0;
	unlock();
	status();
}

function first(){
	borrarTabla();
	navegacion = miLibro.listaFacturas.start;
	current_factura = navegacion.data;
	rellenarCampos();
}

function rellenarCampos(){
	document.getElementById('codigo').value = current_factura.codigo;
	document.getElementById('fecha').value = current_factura.fecha;
	document.getElementById('direccion').value = current_factura.cliente.direccion;
	document.getElementById('nif').value = current_factura.cliente.nif;
	document.getElementById('nombre').value = current_factura.cliente.nombre;
	var lineas_facturas = current_factura.lineaFactura;
	var lin = lineas_facturas.start;
  	while(lin !=null){
		insertarLinetaTabla(lin);
		lin = lin.next;
	}
	/*  Codogio mas que redundante 
	document.getElementById('total').value =  current_factura.Total();
	document.getElementById('iva').value =  current_factura.Iva();
	document.getElementById('totalIva').value = current_factura.TotalIva();
*/
	
}

function previous(){
	
	if(navegacion.prev!=null){
		borrarTabla();
		navegacion = navegacion.prev;
		current_factura = navegacion.data;
		rellenarCampos();
	}
	//TODO: agregar código disable aqui
}

function next(){
	
	if(navegacion.next !=null){
		borrarTabla();
		navegacion = navegacion.next;
		current_factura = navegacion.data;
		rellenarCampos();
	}
	//TODO: agregar código disable aqui
}

function last(){
	borrarTabla();
	navegacion = miLibro.listaFacturas.end;
	current_factura = navegacion.data;
	rellenarCampos();
}

function insLinea () {
	var check1 = document.getElementById('r_servicios').checked;
	var check2 = document.getElementById('r_productos').checked;
	if(check1 || check2){
		var prod = document.getElementById('selectProd');
		var product = prod[prod.selectedIndex].text;
		var pre = document.getElementById('selectProd').value;
		var uni = document.getElementById('unidades').value;
		var tot = document.getElementById('totalLinea').value;
	
		if(check1){
			var linea = new LineaServicio(product,pre);
			
		}else{
			if(uni == 0 || uni =="" || uni==NaN){
				alert("introduce una cantidad correcta para este artículo");
			}else{
				var linea = new LineaProducto(product,pre,uni);
				
			}
		}	  
		if(pre!=0){
				current_factura.lineaFactura.add(linea);
				insertarLinetaTabla(current_factura.lineaFactura.end);
		}else{
			alert("Debes elegir un producto");
		}
	}else{
		alert("Elige el tipo de producto");
	}
}

function insertarLinetaTabla(linea) {

	var fila = tabla.tBodies[0].insertRow(-1);
	fila.insertCell(0).textContent = linea.data.descripcion; 
	fila.insertCell(1).textContent = linea.data.dbPrecio;
	fila.insertCell(2).textContent = (linea.data.cantidad != undefined)? linea.data.cantidad : "-" ;
	fila.insertCell(3).textContent = Math.round(linea.data.total*100)/100;
	
	
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
	document.getElementById('total').value =  Math.round(current_factura.Total()*100)/100;
	document.getElementById('iva').value =  Math.round(current_factura.Iva()*100)/100;
	document.getElementById('totalIva').value = Math.round(current_factura.TotalIva()*100)/100;
	
}


function errorFacturaNueva(){
		alert('No puedes crear una nueva factura mientras estás editando una. ');
}

function Navegar () {
  flStado = 3;
  status();
  unlock();
  first();
}

function Salir (){
	if(confirm("¿Seguro que quieres salir y procastinar un rato?"))
		window.location.href="http://www.cuantocabron.com/";
	
}





/* 
 * como el paso de crear varias tablas lo vamos a utilizar muchas veces, lo he externalizado,
 * y dividido en dos secciones

 */
function CrearTabla(oTabla){
	var oTHead = document.createElement("thead");
	var oFila= oTHead.insertRow(0);
	oFila.insertCell(0).textContent = "Descripcion";
	oFila.insertCell(1).textContent = "Precio";
	oFila.insertCell(2).textContent = "Unidades";
	oFila.insertCell(3).textContent = "Total Linea";
	oTabla.appendChild(oTHead);
	 
	var oTBody = document.createElement("tbody");
	oTabla.appendChild(oTBody);
}


/**
 *      Funciones asociadas a los listados
 */



function ListadoSimple () {
	var popup = crearVentana("Listado Simple");
	
	/*
	 * Esta es la única manera de que funcione. Eseperamos a que la página cargue para añadir el contenido,
	 *   y ejecutamos una función anónima. En realidad tiene mucho sentido, pero es difícil ver el sutil matiz
	 */
	
	popup.onload = function(){ 
					 cabeceraListado(popup,"Listado Simple");
					cerrarPopup(popup);
	
    var tabla = popup.document.getElementById("tablap");
        var oTHead = document.createElement("thead");
	var oFila= oTHead.insertRow(0);
	oFila.insertCell(0).textContent = "Código";
	oFila.insertCell(1).textContent = "Cliente";
	oFila.insertCell(2).textContent = "NIF";
	oFila.insertCell(3).textContent = "Total";
	tabla.appendChild(oTHead);
	
	var oTfoot = tabla.createTFoot();
	//tabla.appendChild(oTfoot);
	var oTBody = miLibro.generarListadoSimple();
		oFila = oTfoot.insertRow(0);
	oFila.insertCell(0).textContent = "";
	oFila.insertCell(1).textContent = "";
	oFila.insertCell(2).textContent = "Total:";
	oFila.insertCell(3).textContent = total_del_todo;
	 
	
	tabla.appendChild(oTBody);
	
	
	

	
	};
}

function crearVentana (nombre) {
		var popup = window.open('popup.html',nombre,'width=700,height=500,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0');
		return popup;
	
}
function ListadoAgrupado(){
	var popup = crearVentana("Listado Agrupado");
	popup.onload = function(){ 
					cerrarPopup(popup);
					 cabeceraListado(popup,"Listado Agrupado");
					 var tabla = popup.document.getElementById("tablap");
					 	var tbody =	miLibro.generarListadoAgrupado();
					 	tabla.appendChild(tbody);
					};
		
	
}

function cabeceraListado (popup,texto) {
	var h3 = document.createElement( "H3" );
        h3.textContent= texto;
    //    document.body.appendChild(h3);
        
        // Here come div's atts;
   //
	//	clone = h3.cloneNode(true);
		 var header = popup.document.getElementById("contenido");
       header.appendChild(h3);
  
}
function cerrarPopup(popup) {
	var boton =  popup.document.getElementById("cerrar");
	boton.addEventListener("click",function(){popup.window.close();},false);
}

window.onload = start;


