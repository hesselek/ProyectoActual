//aqui estan los datos del programa y algunas facturas de prueba
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
	 * creamos dos listas y a�adimos los servicios
	 */
	var lsServicios = new List();
	var	lsProductos = new List();
	
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
	while(producto !=null){
		document.write(producto.data.descripcion+'<br />');
		producto = producto.next;
	}
		var servicio = lsServicios.start;
	while(servicio !=null){
		document.write(servicio.data.descripcion+'<br />');
		servicio = servicio.next;
	}
}
