<?php
	/*
	 * Esta es una pequeña implementacion de un modelo mvc. Todos los links de la página pasan por este método. 
	 * Este redirige a la página principal, donde la funcion main() muestra el script correspondiente. 
	 */
	
	header('Location: index.php?page='.$_GET['p']);  
	