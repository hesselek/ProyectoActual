<?php

//$tiempo =  simplexml_load_file("http://www.aemet.es/xml/municipios/localidad_localidad_28013.xml");

$tiempo =  simplexml_load_file("http://www.aemet.es/xml/municipios/localidad_41038.xml");


/*
 * Voy a parsear desde el servidor el contenido del xml, para poder sacar un objeto JSON.
 */
 
 /*
  * Esto me permite cre
  */
$hora = date("H");
$periodo = 3;
if($hora>6)
	$periodo++;
if($hora>12)
	$periodo++;
if($hora>18)
	$periodo++;

//$periodo = 6;
	/*
	 * Es necesario castear el contenido de ciertas variables, pues para php son objetos, 
	 */

	$objeto_salida = array();
	/*
	 * En este array se almacenan tres valores de los que necesitamos tres datos
	 */
	 
	 $array_tem = array("temperatura","sens_termica","humedad_relativa");
	
	for($i=0;$i<2;$i++){
		$predic = $tiempo->prediccion->dia[$i];
		$predic_dia['prob_precipitacion'] = (String)$predic->prob_precipitacion[$periodo];
		$predic_dia['descripcion'] = (String) $predic->estado_cielo[$periodo]['descripcion'];
		$predic_dia['icono']	   = (String) $predic->estado_cielo[$periodo];
		
		/*los datos del dia actual suelen estar, digamos, desactualizados. si no se encuentra el dato,
		 * buscamos el primer dato que no sea nulo
		 */
		 if($predic_dia['descripcion']==""){
		$estado = $predic->estado_cielo;//
			foreach ($estado as $key => $value) {
			
				if($value['descripcion'] !=""){
					$predic_dia['descripcion'] = (String) $value['descripcion'];
					$predic_dia['icono']	   = (String) $value;
				}
			}
		}
		
		$predic_dia['direccion_v'] = (String) $predic->viento[$periodo]->direccion;
		$predic_dia['velocidad_v'] = (string) $predic->viento[$periodo]->velocidad;
		
		foreach ($array_tem as $key => $value) {
			$arr_aux = array();
			$arr_aux['maxima'] = (String) $predic->$value->maxima;
			$arr_aux['minima'] = (String) $predic->$value->minima;
			$arr_aux['actual'] = (String) $predic->$value->dato[$periodo-3];
			
			$predic_dia[$value] = $arr_aux;
			
		}

		array_push($objeto_salida,$predic_dia);
	}






echo json_encode($objeto_salida);


?>