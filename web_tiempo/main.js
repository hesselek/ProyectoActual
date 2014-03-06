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
	var dias = ['#today','#tomorrow'];
	var predicciones = JSON.parse(respuesta);
	//var predic = predicciones[0];
	//var tomorrow = predicciones[1];
	for (var i=0; i<predicciones.length;i++){
		var predic = predicciones[i];
	var dia = dias[i];
	$(dia).find(".variable_text").text("");
	$(dia).find('.localidad').append($('#municipio').val()+' '+predic.fecha);
   	$(dia).find(".temp").append(predic.temperatura.actual+" &deg;C");
	$(dia).find('.descripcion').append(predic.descripcion);
 	$(dia).find('.sen_termica').append(predic.sens_termica.actual);
   	$(dia).find('.precipitacion').append(predic.prob_precipitacion+'%');
 	$(dia).find('.viento').append(predic.velocidad_v+' Km/h<span class="compas"></span> '+predic.direccion_v);
  	$(dia).find('.icono_tiempo').attr("src","img/iconos_tiempo/"+predic.icono+".png");
    $(dia).find('.temp_min').append(predic.temperatura.minima+" &deg;C");
    $(dia).find('.temp_max').append(predic.temperatura.maxima+" &deg;C");
    $(dia).find('.sen_min').append(predic.sens_termica.minima+" &deg;C");
    $(dia).find('.sen_max').append(predic.sens_termica.maxima+" &deg;C");
    $(dia).find('.hum_min').append(predic.humedad_relativa.minima+'%');
    $(dia).find('.hum_max').append(predic.humedad_relativa.maxima+'%');
    
   }
//}

}


function obtenerFeeds(){
	var periodico = $("#misFeed :selected").val();
	var xml = $.ajax({
      url: "feed.php",
     data: {url:periodico},
      success: function(xml){
         $('#feedID').html("");
         cargar_rss(xml, '#feedID');
           
         
         
      }
  });
}

	
	

	
	


/*  Es un HORROR la que hay que montar para que esto funcione */
function cargar_rss(xml, id_contenedor){
   var limit = xml.getElementsByTagName('item').length;//obtengo la cantidad de entradas
   var rss = "";//comienzo el string
   for (var l=1; l<=limit; l++){// un for desde 1 hasta la cantidad de entradas
      //obtengo titulo vinculo fecha de publicación y descripción
      var title= xml.getElementsByTagName('title').item(l+1).firstChild.data;
      var url = xml.getElementsByTagName('link').item(l+1).firstChild.data;
      var pubDate= xml.getElementsByTagName('pubDate').item(l-1).firstChild.data;
      var description = xml.getElementsByTagName('description').item(l+1).firstChild.data;
      	description = description.slice(0,200); //recorto el texto para que quede mas pequeño, y ademas, tenia ganas de usar esto
      var date = pubDate.split(" +");
      rss = "<fecha>"+date[0]+"<fecha><br/><titulo><a href=\""+url+"\">"+title+"</a></titulo><br/><descripcion>"+description+"</descripcion><hr />";
      $(id_contenedor).append(rss);
   }
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
