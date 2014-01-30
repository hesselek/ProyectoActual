

var miLibro = new Libro();
var flStado = 0;




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
		case 1:
			Bloquear('linea',true);
			Bloquear('listar');
			Desbloquear('cabecera');
			break;
		case 2:
			Bloquear('cabecera',false);
			Bloquear('listar',false);
			Desbloquear('linea');
			break;
		case 3:
			Bloquear('cabecera',true);
			Bloquear('linea',true);
			Desbloquear('listar');
			break;
	}
	
	}
function Desbloquear (formulario) {
  var form2 = document.getElementById(formulario);
  for (i=0;i<form2.elements.length;i++)
	{
		form2.elements[i].disabled=false;
	}
}
function Bloquear(formulario,limpiar){
	
	var form1 = document.getElementById(formulario);
	
	for (i=0;i<form1.elements.length;i++)
	{
		form1.elements[i].disabled=true;
		if(limpiar && form1.elements[i].type !='button')
		form1.elements[i].value = '';
		if(form1.elements[i].type='radio')
			form1.elements[i].checked=false;
		if(form1.elements[i].type='select'){
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
	var nodo = e.target;
	alert('Hola, soy el boton '+nodo.id);
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




window.onload = start;
