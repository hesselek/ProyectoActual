var peticion = null;
var elementoSeleccionado = -1;
var sugerencias = null;
var cacheSugerencias = {};

function inicializa_xhr() {
  if (window.XMLHttpRequest) {
    return new XMLHttpRequest(); 
  } else if (window.ActiveXObject) {
    return new ActiveXObject("Microsoft.XMLHTTP"); 
  } 
}

Array.prototype.formateaLista = function() {
  var codigoHtml = "";

  codigoHtml = "<ul>";
  for(var i=0; i<this.length; i++) {
    if(i == elementoSeleccionado) {
      codigoHtml += "<li class=\"seleccionado\">"+this[i][0]+"</li>";
    }
    else {
      codigoHtml += "<li>"+this[i]+"</li>";
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
    document.getElementById("municipio").value = sugerencias[elementoSeleccionado];
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

window.onload = function() {
  // Crear elemento de tipo <div> para mostrar las sugerencias del servidor
  var elDiv = document.createElement("div");
  elDiv.id = "sugerencias";
  document.body.appendChild(elDiv);
  
  document.getElementById("municipio").onkeyup = autocompleta;
  document.getElementById("municipio").focus();
};
