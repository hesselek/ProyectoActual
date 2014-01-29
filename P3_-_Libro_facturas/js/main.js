
//Lo primero, crear un libro nuevo...
var miLibro = new Libro();
var flStado = 1;

//creamos unos cuantos servicios y  productos y fa


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
			bloquear('linea',true);
			bloquear('listar');
			break;
		case 2:
			bloquear('cabecera',false);
			bloquear('listar',false);
			break;
		case 3:
			bloquear('cabecera',true);
			bloquear('linea',true);
			break;
	}
	
	}
function bloquear(formulario,limpiar){
	
	var form1 = document.getElementById(formulario);
	var sAux = '';
	for (i=0;i<form1.elements.length;i++)
	{
		form1.elements[i].disabled=true;
		if(limpiar)
		form1.elements[i].value = '';
		if(form1.elements[i].type='radio')
			form1.elements[i].checked=false;
		
	}

}

window.onload = start;
