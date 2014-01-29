
//Lo primero, crear un libro nuevo...
var miLibro = new Libro();

//creamos unos cuantos servicios y  productos y fa


function start () {
  initializeData();
  initializeEvents();
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


window.onload = start;
