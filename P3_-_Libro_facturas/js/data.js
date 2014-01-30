/*
 * 	Variables Globales
 */

	var lsServicios = new List();
	var	lsProductos = new List();


function initializeData(){
	//lo ideal sería que los datos que aqu� se muestran se pasasen desde la base de datos
	/**
	 * Productos 
	 */
	var pro1 = new Producto(60.75,'Mem. DDRII 516mb');
	var pro2 = new Producto(81.30,'Mem. DDRII 1Gb');
	var pro3 = new Producto(176.20,'Athlon Fx-55 3.0 Ghz');
	var pro4 = new Producto(320.75,'Pentium IV 2.8 GHz');
	var pro5 = new Producto(97.45,'Placa base Asus PIV');
	
	/*
	 * Servicios
	 */
	var ser1 = new Servicio(30,'Instalacion WP');
	var ser2 = new Servicio(20,'Instalacion W2000');
	var ser3 = new Servicio(12,'Instalación Oracle');
	var ser4 = new Servicio(27.80,'Montaje PC');
	var ser5 = new Servicio(16.70,'Ampliación');
	
	/*
	 * Clientes
	 */
	var cli1 = new Cliente("C/Olmo Nº 15","77755522Z","Margarita del Monte Romero");
	var cli2 = new Cliente("C/Peral Nº 7, 4º-D","55566678D","Manuel Gracia Suelta");
	var cli3 = new Cliente("C/Encina Nº 8, 1º-A", "00099933R","Encarnación de Dios Avemaría");
	var cli4 = new Cliente("C/Roble Nº 5, 2º-B","33344412S","Román del Pino Seco");
	
	/*
	 *  Lineas
	 * 
	 */
	var li1 = new LineaProducto();
	var li2 = new LineaServicio();
	var li3 = new LineaProducto();
	var li4 = new LineaServicio();
	var li5 = new LineaProducto();
	var li6 = new LineaServicio();
	var li7 = new LineaProducto();
	var li8 = new LineaServicio();
	var li9 = new LineaProducto();
	var li10 = new LineaServicio();
	/*
	 * añadimos los servicios, los clientes y las facturas a las listas creadas:
	 */
	
	
	lsServicios.add(ser1);
	lsServicios.add(ser2);
	lsServicios.add(ser3);
	lsServicios.add(ser4);
	lsServicios.add(ser5);
	
	lsProductos.add(pro1);
	lsProductos.add(pro2);
	lsProductos.add(pro3);
	lsProductos.add(pro4);
	lsProductos.add(pro5);
	
	/*
	 * comprobamos que funciona
	 */
	var producto = lsProductos.start;
/*	while(producto !=null){
		document.write(producto.data.descripcion+'<br />');
		producto = producto.next;
	}
		var servicio = lsServicios.start;
	while(servicio !=null){
		document.write(servicio.data.descripcion+'<br />');
		servicio = servicio.next;
	}*/
}
function initializeEvents(){
	 		
           var radio_productos = document.getElementById('r_productos');
            var radio_servicios = document.getElementById('r_servicios');
            var select_option = document.getElementById('selectProd');
            radio_servicios.addEventListener ("change", RadioCambio, false);
            radio_productos.addEventListener ("change", RadioCambio, false);
            select_option.addEventListener("change", CambioSelect,false);
         
         
         /*
          * Esta parte me permite generar todos los eventos de los botones de una vez, sin tener que repetirlos.
          * Es mas, si añadimos un nuevo botón, solo tenemos que crear la función asociada al evento, ya que este
          * se generará automáticamente. También resulta más fácil determinar que función está asociada a un 
          * evento específico, pues el nombre de la función coincide con el id del botón. 
          */
            var inputs = document.getElementsByTagName('input');
            for(var i=0;i<inputs.length;i++){
            	if(inputs[i].type == 'button'){
            		document.getElementById(inputs[i].id).addEventListener("click",window[inputs[i].id],false);
            	}
            		
            	   
            }
            
}


function RadioCambio (event) {
          var radio = event.target;
           if (radio.value === 'serv') {
                CargarLista(lsServicios);
            }
            else {
                CargarLista(lsProductos);
            }
}

function CambioSelect (event){
	var valor = event.target;
}
