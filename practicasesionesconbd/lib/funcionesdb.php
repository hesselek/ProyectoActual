<?php
	function conexion(){
		try{	 
		    $db = new PDO('mysql:host=localhost;dbname=lindavista', 'root', '');
		}catch(exception $e){
			echo $e->getMessage();	
			$db = null;
		}
		return $db;
	}
	
	function chckUser($nombre,$clave){
		if($db = conexion()){
			$resultado = $db->prepare("SELECT * FROM `usuarios` WHERE `usuario`= ? AND `clave` = ?");
			$parametros = array($nombre,$clave);
			$resultado->execute($parametros);
			$res = $resultado->rowCount();
			
		}else{
			echo "Fallo al intentar la conexion";
			$res = 0;
		}
		return $res;
	}
?>