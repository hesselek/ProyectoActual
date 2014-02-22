/*
 * 	Variables Globales
 */

	var lsServicios = new List();
	var	lsProductos = new List();


function initializeData(){
	
		flStado = 0;
		miLibro = new Libro();
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
	 *  Lineas
	 * 
	 */
	/*
 * lineas de producto de prueba
 */
	var li1 = new LineaProducto(pro1.descripcion,pro1.precio,10);
	var li2 = new LineaServicio(ser1.descripcion,ser1.precio);
	var li3 = new LineaProducto(pro2.descripcion,pro2.precio,10);
	var li4 = new LineaServicio(ser2.descripcion,ser2.precio);
	var li5 = new LineaProducto(pro3.descripcion,pro3.precio,10);
	var li6 = new LineaServicio(ser3.descripcion,ser3.precio);
	var li7 = new LineaProducto(pro4.descripcion,pro4.precio,10);
	var li8 = new LineaServicio(ser4.descripcion,ser4.precio);
	var li9 = new LineaProducto(pro5.descripcion,pro5.precio,10);
	var li10 = new LineaServicio(ser5.descripcion,ser5.precio);
/*
	 * Clientes de prueba
	 */
	var cli1 = new Cliente("C/Olmo Nº 15","77755522Z","Margarita del Monte Romero");
	var cli2 = new Cliente("C/Peral Nº 7, 4º-D","55566678D","Manuel Gracia Suelta");
	var cli3 = new Cliente("C/Encina Nº 8, 1º-A", "00099933R","Encarnación de Dios Avemaría");
	var cli4 = new Cliente("C/Roble Nº 5, 2º-B","33344412S","Román del Pino Seco");
	
	/*
	 * facturas de prueba
	 */
	var fac1 = new Factura(cli1, miLibro.codigoFactura());
				fac1.lineaFactura.add(li1);
				fac1.lineaFactura.add(li5);
				fac1.lineaFactura.add(li7);
				fac1.lineaFactura.add(li3);
				fac1.lineaFactura.add(li2);
	var fac2 = new Factura(cli4, miLibro.codigoFactura());
				fac2.lineaFactura.add(li3);
				fac2.lineaFactura.add(li5);
				fac2.lineaFactura.add(li8);
				fac2.lineaFactura.add(li9);
				fac2.lineaFactura.add(li10);
	var fac3 = new Factura(cli2,miLibro.codigoFactura());
				fac3.lineaFactura.add(li1);
				fac3.lineaFactura.add(li7);
				fac3.lineaFactura.add(li6);
				fac3.lineaFactura.add(li6);
				fac3.lineaFactura.add(li5);
				fac3.lineaFactura.add(li4);
				fac3.lineaFactura.add(li3);
	var fac4 = new Factura(cli2,miLibro.codigoFactura());
				fac4.lineaFactura.add(li6);
				fac4.lineaFactura.add(li2);
				fac4.lineaFactura.add(li5);
				fac4.lineaFactura.add(li4);
	var fac5 = new Factura(cli4,miLibro.codigoFactura());
				fac5.lineaFactura.add(li6);
				fac5.lineaFactura.add(li7);
				fac5.lineaFactura.add(li6);
				fac5.lineaFactura.add(li5);
				fac5.lineaFactura.add(li4);
	var fac6 = new Factura(cli4,miLibro.codigoFactura());
				fac6.lineaFactura.add(li4);
				fac6.lineaFactura.add(li1);
				fac6.lineaFactura.add(li2);
				fac6.lineaFactura.add(li4);
				
	miLibro.listaFacturas.add(fac6);
	miLibro.listaFacturas.add(fac2);
	miLibro.listaFacturas.add(fac3);
	miLibro.listaFacturas.add(fac4);
	miLibro.listaFacturas.add(fac1);
	miLibro.listaFacturas.add(fac5);
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
	

}
function initializeEvents(){
	 		
           var radio_productos = document.getElementById('r_productos');
            var radio_servicios = document.getElementById('r_servicios');
            var select_option = document.getElementById('selectProd');
            radio_servicios.addEventListener ("change", RadioCambio, false);
            radio_productos.addEventListener ("change", RadioCambio, false);
            select_option.addEventListener("change", CambioSelect,false);
         	
         	document.getElementById('nuevaFactura').addEventListener("click",NuevaFactura,false);
         	document.getElementById('navegar').addEventListener("click",Navegar,false);
         	document.getElementById('salir').addEventListener("click",Salir,false);
         	document.getElementById('listadoSimple').addEventListener("click",ListadoSimple,false);
       		document.getElementById('listadoAgrupado').addEventListener("click",ListadoAgrupado,false);
       		document.getElementById('unidades').addEventListener("change",ActualizarTotalLinea,false);
       		
       		/*  Acabo de descubrir la importancia de la diferencia entre keypress y keyup. 
       		 * Basta sustituir en este evento uno por otro para darse cuenta. 
       		 */
       		document.getElementById('unidades').addEventListener("keyup",ActualizarTotalLinea,false);
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
/*
 * Funciones auxiliares. Puestas aquí por que son muy específicas
 */

/*
 * Esta función añade un poco más de seguridad al flujo de trabajo, impidiendo que
 * se intente crear una nueva factura mientras se está editando una. 
 */

function unlock(){
	document.getElementById('nuevaFactura').removeEventListener("click",errorFacturaNueva,false);
	document.getElementById('nuevaFactura').addEventListener("click",NuevaFactura,false);
}

function RadioCambio (event) {
          var radio = event.target;
          var unidades = document.getElementById('unidades');
           if (radio.value === 'serv') {
                CargarLista(lsServicios,"Selecciona un servicio");
                unidades.disabled = true;
                unidades.value ='';
            }
            else {
                CargarLista(lsProductos,"Selecciona un producto");
                 unidades.disabled = false;

            }
}

function CambioSelect (event){
	 var unidades = document.getElementById('unidades');
	var valor = event.target;
	document.getElementById('precio').value = valor.value;
	unidades.value = "";
	ActualizarTotalLinea();
	
}

function ActualizarTotalLinea () {
	var total = document.getElementById('totalLinea');
	var uni = document.getElementById('unidades').value;
	if(uni !=0 || uni != "") {
	  total.value = uni * document.getElementById('precio').value;
	  total.value = Math.round(total.value*100)/100;
	}else{
		total.value = document.getElementById('precio').value;
		
	}
}
