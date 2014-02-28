var peticion = null;
var elementoSeleccionado = -1;
var sugerencias = null;
var cacheSugerencias = {};
var respuesta = null;
var llamada = null;

/****
 * Código del primer ejercicio. Poco o nada modificado. 
 */

function inicializa_xhr() {
  if (window.XMLHttpRequest) {
    return new XMLHttpRequest(); 
  } else if (window.ActiveXObject) {
    return new ActiveXObject("Microsoft.XMLHTTP"); 
  } 
}

Array.prototype.formateaLista = function() {
  var codigoHtml = "";
  var est= "";
  codigoHtml = "<ul>";
  for(var i=0; i<this.length; i++) {
    if(i == elementoSeleccionado) {
      codigoHtml +=  "<li class='seleccionado'>"+this[i][0]+"</li>";
    }
    else {
    	//est = this[i];
      codigoHtml += "<li>"+this[i][0]+"</li>";
    }
  }
  codigoHtml += "</ul>";

  return codigoHtml;
};

function autocompleta() {
  var elEvento = arguments[0] || window.event;
  var tecla = elEvento.keyCode;

  if(tecla == 40) { // Flecha Abajo 
    if(elementoSeleccionado+1 < sugerencias.length) {
      elementoSeleccionado++;
    }
    muestraSugerencias(); // --> Formatea class='seleccionado' el elemento seleccionado
  }
  else if(tecla == 38) { // Flecha Arriba
    if(elementoSeleccionado > 0) {
      elementoSeleccionado--;
    }
    muestraSugerencias(); // --> Formatea class='seleccionado' el elemento seleccionado
  }
  else if(tecla == 13) { // ENTER o Intro
    seleccionaElemento();
  }
  else { // Tenemos que buscar sugerencias en el servidor --> AJAX
    var texto = document.getElementById("municipio").value;
    
    // Si es la tecla de borrado y el texto es vacío, ocultar la lista
    if(tecla == 8 && texto == "") {
      borraLista();
      return;  // Chapú
    }
    
    if(cacheSugerencias[texto] == null) {
      peticion = inicializa_xhr();
      
      peticion.onreadystatechange = function() { 
        if(peticion.readyState == 4) {
          if(peticion.status == 200) {
            sugerencias = eval('('+peticion.responseText+')');
            if(sugerencias.length == 0) {
              sinResultados();
            }
            else {
              cacheSugerencias[texto] = sugerencias;
              actualizaSugerencias();
            }
          }
        }
      };
      
      peticion.open('POST', 'autcompMun.php?nocache='+Math.random(), true);
      peticion.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      peticion.send('municipio='+encodeURIComponent(texto));
    }
    else {
      sugerencias = cacheSugerencias[texto];
      actualizaSugerencias();
    }
  }
}

function sinResultados() {
  document.getElementById("sugerencias").innerHTML = "No existen municipios que empiecen con ese texto";
  document.getElementById("sugerencias").style.display = "block";
}

function actualizaSugerencias() {
  elementoSeleccionado = -1;
  muestraSugerencias();
}

function seleccionaElemento() {
  if(sugerencias[elementoSeleccionado]) {
    document.getElementById("municipio").value = sugerencias[elementoSeleccionado][2];
    document.getElementById("oculto").value = 	 sugerencias[elementoSeleccionado][1];
    borraLista();
  }
}

function muestraSugerencias() {
  var zonaSugerencias = document.getElementById("sugerencias");
  
  zonaSugerencias.innerHTML = sugerencias.formateaLista();
  zonaSugerencias.style.display = 'block';  
}

function borraLista() {
  document.getElementById("sugerencias").innerHTML = "";
  document.getElementById("sugerencias").style.display = "none";
}

/*
 *    Código del segundo ejercicio. La respuesta, va a venir mediante un objeto JSON
 * 	
 */

function obtenerTiempo(event){
	var loc = { localidad : $("#oculto").val() };  // Objeto literal

	var jLocalidad = JSON.stringify(loc);

	 llamada = inicializa_xhr();
	
	 llamada.onreadystatechange = function() { 
        if(llamada.readyState == 4) {
          if(llamada.status == 200) {
          	respuesta = llamada.responseText;
          	procesar();
            
          }
        }
      };
	/**  hack de pruebas:
	 * 
	 */
	llamada.open('POST',"eltiempo.php", true);
	//llamada.open('POST',"eltiempo.php", true);
    llamada.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    llamada.send("datos="+jLocalidad);//escape(jLocalidad)
	
}

function procesar(){

	var predicciones = JSON.parse(respuesta);
	var today = predicciones[0];
	var tomorrow = predicciones[1];
	$(".variable_text").text("");
	$('#localidad').append($('#municipio').val());
    $("#temp").append(today.temperatura.actual+" &deg;C");
    $('#descripcion').append(today.descripcion);
    $('#sen_termica').append(today.sens_termica.actual);
    $('#viento').append(today.velocidad_v+' Km/h<span class="compas"></span> '+today.direccion_v);
    $('#icono_tiempo').attr("src","img/iconos_tiempo/"+today.icono+".png");
//}

}


//Es curioso. El $(this)  de dentro del each no es el mismo que el de fuera. Confuso, muy confuso.
function obtenerFeeds(){
	var periodico = $("#misFeed :selected").val();
	
	$("#feedID").load("feed.php",{url:periodico},function(responseText, textStatus, oXHR){
		var texto = "";
		 var items = $(this).find("item").each(function(){
		 	var cabecera =  $(this).find("title").text();
		 	 texto += "<li>"+cabecera+"</li>";
		 });
		
		 $(this).text("");
		 $(this).append($(texto));
		
	});
	
}

$(document).ready(function() {
   var elDiv = document.createElement("div");
  elDiv.id = "sugerencias";
  document.body.appendChild(elDiv);
  document.getElementById("municipio").onkeyup = autocompleta;
  document.getElementById("municipio").focus();
  
  $("#myForm").submit(function(e){
    	e.preventDefault();
    	obtenerTiempo();  
    	e.stopPropagation;
	});
   
   $("#misFeed").change(function(){
   		obtenerFeeds();
   });
}); 
