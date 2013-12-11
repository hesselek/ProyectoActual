/**
 * @author carlos
 */



function volver() {
    document.write("<br /><a href='Ejercicios_javascript.html'>Volver</<a>");
}

function ejer001() {
    document.write('Hola mundo');
    volver();
}

function ejer002() {
    document.write("nombre: Carlos<br />edad: ...");
    volver();
}

function ejer003() {
    var nombre = 'Luis Pérez';
    var edad = 23;
    var estado_civil = "soltero";

    document.write("Nombre: " + nombre + " Edad: " + edad + " Estado civil: " + estado_civil);
    volver();

}
function ejer004() {
    var nombre = new String();
    var sueldo = new Number();
    sueldo = 1345.09;
    nombre = 'Luis perez';
    document.write("Nombre: " + nombre + "<br />Sueldo: " + sueldo);
    volver();

}

function ejer005() {
    /*  Cree un programa que solicite al usuario que introduzca su nombre y su edad */
    prompt("Introduce tu nombre");
    prompt("introduce tu edad");
    volver();

}
function ejer006() {
    /*  Confeccionar un programa que permita cargar el nombre de un usuario y su mail por teclado.<br />
     Mostrar posteriormente los datos en la pÃ¡gina HTML. */
    var nombre = prompt("Introduce tu nombre");
    var email = prompt("introduce tu email");


    document.write("Nombre: " + nombre + "<br />Email: " + email);
    volver();

}
function ejer007() {
    /*
     *  7.	Realizar la carga de dos nÃºmeros por teclado e imprimir su suma y su producto.
     */
    var numero1 = parseInt(prompt("Introduce un numero"));
    var numero2 = parseInt(prompt("introduce otro numero"));
    var suma = numero1 + numero2;
    var producto = numero1 * numero2;
    document.write("Suma: " + suma + "<br />Producto: " + producto);
    volver();
}
function ejer008() {
    /*
     *  8.	Realizar la carga del lado de un cuadrado, mostrar por pantalla el perÃ­metro del mismo 
     * 	(El perÃ­metro de un cuadrado se calcula multiplicando el valor del lado por cuatro). 
     */
    var numero1 = parseInt(prompt("Introduce el lado"));
    document.write("Perimetro: " + numero1 * 4);
    volver();
}
function ejer009() {
    /*
     *  9.	Escribir un programa en el cual se ingresen cuatro nÃºmeros, calcular e informar 
     *  la suma de los dos primeros y el producto del tercero y el cuarto. 
     */
    var numero1 = parseInt(prompt("Introduce primer numero"));
    var numero2 = parseInt(prompt("Introduce segundo numero"));
    var numero3 = parseInt(prompt("Introduce tercer numero"));
    var numero4 = parseInt(prompt("Introduce cuarto numero"));
    var suma = numero1 + numero2;
    var producto = numero3 * numero4;
    document.write("Suma: " + suma + "<br />Producto: " + producto);
    volver();
}


function ejer010() {
    /*
     *  10.	Realizar un programa que lea cuatro valores numÃ©ricos e informar su suma y producto. 
     */
    var numero1 = parseInt(prompt("Introduce primer numero"));
    var numero2 = parseInt(prompt("Introduce segundo numero"));
    var numero3 = parseInt(prompt("Introduce tercer numero"));
    var numero4 = parseInt(prompt("Introduce cuarto numero"));
    var suma = numero1 + numero2 + numero3 + numero4;
    var producto = numero3 * numero4 * numero1 * numero2;
    document.write("Suma: " + suma + "<br />Producto: " + producto);
    volver();

}
function ejer011() {
    /*
     *  11.	Se debe desarrollar un programa que pida el ingreso del precio de un artÃ­culo y la cantidad 
     *  que lleva el cliente. Mostrar lo que debe abonar el comprador.
     */
    var numero2 = parseFloat(prompt("Introduce el precio"));
    var numero3 = parseInt(prompt("Introduce la cantidad"));
    var producto = numero3 * numero2;
    document.write("Total: " + producto);

    volver();
}
function ejer012() {
    /*
     *  12.	Realizar la carga de una nota de un alumno. Mostrar un mensaje que aprobÃ³ si tiene una nota mayor o igual a 4
     */
    var numero = parseFloat(prompt("Introduce una nota"));
    if (numero >= 4)
        alert("Has aprobado");

}
function ejer013() {
    /*
     *  13.	Se ingresan tres notas de un alumno, si el promedio es mayor o igual a siete mostrar el mensaje 'Promocionado'. 
     */
    var nota1 = parseInt(prompt("Introduce primer numero"));
    var nota2 = parseInt(prompt("Introduce segundo numero"));
    var nota3 = parseInt(prompt("Introduce tercer numero"));
    var promedio = (nota1 + nota2 + nota3) / 3;

    if (promedio >= 7)
        alert('Promocionado');


}
function ejer014() {
    /*
     * 14.	Solicitar que se ingrese dos veces una clave. Mostrar un mensaje si son iguales (tener en cuenta que para ver si 
     * 	dos variables tienen el mismo valor almacenado debemos utilizar el operador ==).
     */
    var clave1 = prompt("Introduce tu clave");
    var clave2 = prompt("Vuelve a introducir tu clave");
    if (clave1 === clave2)
        alert("Las claves conciden");
    else
        alert("Las claves no coinciden");
}

function ejer015() {

    /*  15.	Realizar un programa que lea dos números distintos y muestre el mayor de ellos */
    var numero1 = prompt("Introduce un número");
    var numero2 = prompt("Introduce otro número");
    numero1 = parseFloat(numero1);
    numero2 = parseFloat(numero2);
    if (numero1 > numero2)
        alert(numero1 + " es mas grande que " + numero2);
    else
        alert(numero2 + " es mas grande que " + numero1);

}


function ejer016() {
    /*
     * 16.	Realizar un programa que lea por teclado dos números, si el primero es mayor al segundo informar su suma y 
     * diferencia, en caso contrario informar el producto y la división del primero respecto al segundo. 
     */

    numero1 = parseFloat(numero1);
    numero2 = parseFloat(numero2);
    if (numero1 > numero2) {
        var suma = numero1 + numero2;
        var resta = numero1 - numero2;
        alert("La suma vale " + suma + "\n y la resta vale " + resta);
    } else {
        var multi = numero1 * numero2;
        var divi = numero1 / numero2;
        alert("El producto vale " + multi + "\n y la división vale " + divi);
    }
}

function ejer017() {
    /*
     *  17.	Se ingresan tres notas de un alumno, si el promedio es mayor o igual a 4 mostrar un mensaje 'apto', 
     * sino 'suspenso'. 
     */

    if (media >= 4)
        alert("apto");
    else
        alert("suspenso");

}

function ejer018() {
    /*
     * 18.	Se ingresa por teclado un número positivo de uno o dos dígitos (1..99) mostrar un mensaje 
     * 		indicando si el número tiene uno o dos dígitos (recordar convertir a entero con parseInt p
     * 		ara preguntar posteriormente por una variable entera).
     * 		Tener en cuenta qué condición debe cumplirse para tener dos dígitos, un número entero.
     */
    var numero = parseFloat(prompt("Introduce un numero de 1 o dos digitos"));
    if (numero < 10)
        alert("Es un número de un dígito");
    else
        alert("Es un número de dos dígitos");
}
function ejer019() {
    /*	19.	Confeccionar un programa que pida por teclado tres notas de un alumno, calcule el promedio e imprima 
     * 	alguno de estos mensajes:
     *	a.	Si el promedio es >=7 mostrar "Promocionado".
     *	b.	Si el promedio es >=4 y <7 mostrar "Regular".
     *	c.	Si el promedio es <4 mostrar "suspenso".
     */
    var nota1 = parseFloat(prompt("Introduce la primera nota"));
    var nota2 = parseFloat(prompt("Introduce la segunda nota"));
    var nota3 = parseFloat(prompt("Introduce la tercera nota"));
    media = (nota1 + nota2 + nota3) / 3;

    if (media < 4)
        alert("Suspenso");
    if (media >= 4 && media < 7)
        alert("Regular");
    if (media >= 7)
        alert("Promocionado");
}

function ejer020() {
    /*
     * 20. Se ingresa por teclado un valor entero, mostrar una leyenda que indique si el número es positivo, 
     * cero o negativo. 
     */
    var numero = parseInt(prompt("Introduce un número entero"));
    if (numero < 0)
        alert("El número es negativo");
    if (numero === 0)
        alert("El número es cero");
    if (numero > 0)
        alert("El número es positivo");

}

function ejer021() {
    /*
     * 21. Confeccionar un programa que permita cargar un número entero positivo de hasta tres cifras y muestre un
     *  mensaje indicando si tiene 1, 2, ó 3 cifras. Mostrar un mensaje de error si el número de cifras no es 1, 2 ó 3. 
     */
    var numero;
    do {
        numero = parseInt(prompt("Introduce un número de una, dos o tres cifras"));
    } while (isNaN(numero));
    if (numero > 100) {
        if (numero < 1000) {
            alert("número de tres cifras");
        } else {
            alert("el número no tiene 1, 2 o 3 cifras");
        }
    } else {
        if (numero < 10)
            alert("número de una cifra");
        else
            alert("número de dos cifras");
    }

    function ejer021() {
        /*
         * 21. Confeccionar un programa que permita cargar un número entero positivo de hasta tres cifras y muestre un
         *  mensaje indicando si tiene 1, 2, ó 3 cifras. Mostrar un mensaje de error si el número de cifras no es 1, 2 ó 3. 
         */
        var numero = parseInt(prompt("Introduce un número de"));
        if (numero > 100) {
            if (numero < 1000) {
                alert("número de tres cifras");
            } else {
                alert("el número no tiene 1, 2 o 3 cifras");
            }
        } else {
            if (numero < 10)
                alert("número de una cifra");
            else
                alert("número de dos cifras");
        }

    }
    function ejer022() {
        /*
         *  22. De un candidato a un empleo, que realizó un test de capacitación, se obtuvo la siguiente información: 
         * 	nombre del candidato, cantidad total de preguntas que se le realizaron y cantidad de preguntas que contestó 
         * 	correctamente. Se pide confeccionar un programa que lea los datos del candidato e informe el nivel del mismo 
         * 	según el porcentaje de respuestas correctas que ha obtenido, y sabiendo que:
         *	Nivel superior:	Porcentaje>=90%.
         *	Nivel medio:	Porcentaje>=75% y <90%.
         * 	Nivel bajo:	Porcentaje>=50% y <75%.
         * 	Fuera de nivel:	Porcentaje<50%.
         */
        var nombre = prompt("Nombre del Candidato");

        var acertadas;
        var falladas;

        do {
            acertadas = parseInt(prompt("Introduce un número de respuestas acertadas"));
        } while (isNaN(acertadas));
        do {
            falladas = parseInt(prompt("Introduce un número de respuestas falladas"));
        } while (isNaN(falladas));

        var total = acertadas + falladas;

        var porcentaje = (acertadas * 100) / total;
        var nivel;
        if (porcentaje >= 90)
            nivel = 'Superior';
        if (porcentaje >= 75 && porcentaje < 90)
            nivel = 'medio';
        if (porcentaje >= 50 && porcentaje < 75)
            nivel = 'bajo';
        if (porcentaje < 50)
            nivel = 'Fuera de nivel';

        document.write("Resultado de " + nombre + ":<br />Nivel: " + nivel);
        volver();
    }

    function ejer023() {
        /*
         * 23.	Confeccionar un programa que lea por teclado tres números distintos y nos muestre el mayor de ellos.
         */
        var a = parseFloat(prompt("Introduce el primer numero"));
        var b = parseFloat(prompt("Introduce el segundo número"));
        var c = parseFloat(prompt("Introduce el tercer número"));
        var resultado;
        if (a > b) {
            resultado = (a > c) ? a : c;
        } else {
            resultado = (b > c) ? b : c;
        }
        document.write(resultado + "Es el mayor número de los tres");

    }
}

function ejer024() {
    /*
     * 24.	Realizar un programa que pida cargar una fecha cualquiera, luego verificar si dicha fecha corresponde 
     * 		a Navidad. (No utilizar todavía objeto Date)
     */
    var fecha = prompt("Introduce una fecha con el siguiente formato:\n" +
            "dd-mm-aaaa o dd/mm/aaaa");
    var dia = parseInt(fecha.substr(0, 2));
    var mes = parseInt(fecha.substr(3, 2));

    if (dia === 25 && mes === 12)
        alert("Es navidad");
}

function ejer025() {
    /*
     * 25.	Se ingresan tres valores por teclado, si todos son iguales se imprime la suma del primero con el 
     * 		segundo y a este resultado se lo multiplica por el tercero.
     */
    var a = parseFloat(prompt("Introduce el primer numero"));
    var b = parseFloat(prompt("Introduce el segundo número"));
    var c = parseFloat(prompt("Introduce el tercer número"));

    if (a === b === c) {
        var resultado = (a + b) * c;
        alert("Resultado: " + resultado);
    }
}

function ejer026() {
    /*
     * 26.	Se ingresan por teclado tres nÃºmeros, si todos los valores ingresados son menores a 10, imprimir 
     * 		en la pÃ¡gina la leyenda ' Todos los nÃºmeros son menores a diez'. 
     */
    var a = parseFloat(prompt("Introduce el primer numero"));
    var b = parseFloat(prompt("Introduce el segundo número"));
    var c = parseFloat(prompt("Introduce el tercer número"));
    if (a <= b <= c && a < 10)
        alert('Todos los nÃºmeros son menores a diez');
}

function ejer027() {
    /*
     * 	27.	Escribir un programa que pida ingresar la coordenada de un punto en el plano, es decir dos 
     * valores enteros x e y . Posteriormente imprimir en pantalla en quÃ© cuadrante se ubica dicho punto. 
     * 	(1Âº Cuadrante si x > 0 Y y > 0 , 2Âº Cuadrante: x < 0 Y y > 0, etc.) 
     */
    var x = parseFloat(prompt("Introduce la coordenada x:"));
    var y = parseFloat(prompt("Introduce la coordenada y:"));
    var cuadrante;
    if (x > 0) {
        cuadrante = (y > 0) ? 'primer' : 'cuarto';
    } else {
        cuadrante = (y > 0) ? 'segundo' : 'tercer';
    }
    alert("La coordenada se encuentra en el " + cuadrante + " cuadrante");


}

function ejer028() {
    /*
     * 28.	De un operario se conoce su sueldo y los aÃ±os de antigÃ¼edad. Se pide confeccionar un programa 
     * 		que lea los datos de entrada e informe
     a.	 Si el sueldo es inferior a 500 y su antigüedad es igual o superior a 10 aÃ±os, 
     otorgarle un aumento del 20 %, mostrar el sueldo a pagar.
     b.	 Si el sueldo es inferior a 500 pero su antigÃ¼edad es menor a 10 aÃ±os, otorgarle un aumento de 5 %.
     c.	 Si el sueldo es mayor o igual a 500 mostrar el sueldo en la página sin cambios.
     */
    var sueldo = parseFloat(prompt("Introduce el sueldo:"));
    var antiguedad = parseFloat(prompt("Introduce la antig\üedad:"));
    if (sueldo < 500) {
        if (antiguedad >= 10) {
            sueldo = sueldo + (sueldo * 20) / 100;
        } else {
            sueldo = sueldo + (sueldo * 5) / 100;
        }
    }

    alert("El sueldo a pagar es : " + sueldo);


}

function ejer029() {
    /*
     *	29.	Escriba un fichero Javascript externo que alerte al usuario con dos mensajes
     1. Hola Mundo
     2. Mi primer script 
     */
    alert("Hola Mundo");
    alert("Mi primer script");
    volver();
}

function ejer030() {
    /*
     * 	30.	Escriba un programa que alerte al usuario con el mensajes
     Hola Mundo! 
     Qué fácil es incluir 'comillas simples'
     y comillas dobles" "
     */
    alert("Hola Mundo! Qu\é f\ácil es incluir \'comillas imples\' y \"comillas dobles\"");

}

function ejer031() {
    /*
     * 31.	Escriba un programa que muestre al usuario los nombres de los doce meses 
     * 		del año usando la funciónn alert() y el array meses.
     */
    var meses = Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    for (var i = 0; i < meses.length; i++)
        alert(meses[i]);
}
function ejer032() {
    /*
     * 	32.	Cree un programa que muestre el uso bÃ¡sico de los los operadores
     */
    document.write("???????");
    volver();
}

function ejer033() {
    /*
     * 33.	Se carga una fecha (día, mes y año) por teclado. Mostrar un mensaje si corresponde al 
     * primer trimestre del año (enero, febrero o marzo).Cargar por teclado el valor numérico del día, mes y año por separado.
     
     */
    var dia = parseInt(prompt("Introduce el día"));
    var mes = parseInt(prompt("Introduce el mes"));
    var anio = parseInt(prompt("Introduce el a\ño"));
    if (mes <= 3)
        alert("La fecha pertenece al primer trimestre");
}
function ejer034() {
    /*
     * 34.	Realice un programa con dos variables numéricas en el que deberá comprobar 
     i.	- cuál es menor
     ii.	- si la segunda es positiva
     iii.	si la primera es negativa o distinta de 0
     iv.	si al Incrementar en 1 unidad el valor de la primera no lo hace mayor o igual que la segunda
     */

    var primera = parseInt(prompt("Introduce la primera variable"));
    var segunda = parseInt(prompt("Introduce la segunda variable"));
    var menor = primera < segunda ? 'primera' : 'segunda';
    if (primera < segunda)
        alert("La primera variable es menor");
    else
        alert("La segunda variable es menor");

    var positiva = segunda > 0 ? 'es' : 'no es';
    alert("La segunda variable " + positiva + " positiva.");


    alert((primera < 0 || primera !== 0) ? 'La primera variable es negativa o distinta de 0' : 'La primera variable es cero');

    if ((primera + 1) >= segunda)
        alert("Al sumar 1 a la primera variable, esta es mayor o igual que la segunda");
}

function ejer035() {
    /*
     * 
     35.	Intentar escribir un programa en JavaScript que lea tres números e indique el tipo de triángulo 
     que forman (isósceles, equilátero, escaleno). Comprobar que los números realmente formen un triángulo, 
     sino emitir el error
     */
    var lado1 = parseInt(prompt("Introduce el primer n\úmero"));
    var lado2 = parseInt(prompt("Introduce el segundo n\úmero"));
    var lado3 = parseInt(prompt("Introduce el tercer n\úmero"));
    var tipo = '';

    if (!isNaN(lado1) && !isNaN(lado2) && !isNaN(lado3)) {

        if (lado1 === lado2 === lado3) {
            tipo = 'equil\átero';
        } else {
            if (lado1 === lado2 || lado1 === lado3 || lado2 === lado3) {
                tipo = 'is\ósceles';
            } else {
                tipo = 'escaleno';
            }
        }
        alert("Es un tri\ángulo " + tipo);
    } else {
        alert("ERROR \nIntruduce tres n\úmeros correctos");
    }
}

function ejer036() {
    /*
     * 36.	Confeccione un programa que solicite que se ingrese un valor entre 1 y 5. Luego mostrar  el 
     * 		valor ingresado. Mostrar un mensaje de error en caso de haber ingresado un valor que no 
     * 		se encuentre en dicho rango. Utilizar estructura switch
     */
    var numero = parseInt(prompt("Introduce un n\úmero entre 1 y 5"));
    switch (numero) {
        case 1:
            alert("El número introducido es : " + numero);
            break;
        case 2:
            alert("El número introducido es : " + numero);
            break;
        case 3:
            alert("El número introducido es : " + numero);
            break;
        case 4:
            alert("El número introducido es : " + numero);
            break;
        case 5:
            alert("El número introducido es : " + numero);
            break;
        default:
            alert("El número introducido no está en el rango o no es un número");
            break;
    }
}

function ejer037() {
    /*
     * 37.	Solicitar el ingreso de alguna de estas palabras (casa, mesa, perro, gato) luego mostrar 
     * la palabra traducida en inglés. Es decir, si se ingresa 'casa' debemos mostrar el texto 'house' en la pÃ¡gina.
     */
    var palabra = prompt("Introduce una de estas palabras: casa, mesa, perro gato");
    var traduccion = '';
    switch (palabra) {
        case 'casa':
            traduccion = 'house';
            break;
        case 'mesa':
            traducion = 'table';
            break;
        case 'perro':
            traduccion = 'dog';
            break;
        case 'gato':
            traduccion = 'cat';
            break;
        default:
            traduccion = 'No tengo la traducci\ón de esa palabra';
            break;
    }

    alert("La traducción al ingl\és es: \n" + traduccion);
}



function ejer038() {

    /*
     * 38.	Realizar un programa que imprima en pantalla los números del 1 al 100.
     */
    for (var i = 1; i <= 100; i++)
        document.write(i + "<br />");

    volver();
}



function ejer039() {

    /*
     * 39.	Realizar un programa que imprima 25 términos de la serie 11 - 22 - 33 - 44, etc. 
     * 		(No se ingresan valores por teclado). 
     */
    var serie = 0;
    for (var i = 1; i <= 25; i++) {
        serie += 11;
        document.write("T\érmino " + i + " de la serie " + serie + "<br />");
    }
    volver();
}




function ejer040() {
    /*
     * 40.	Mostrar los múltiplos de 8 hasta el valor 500. Debe aparecer en pantalla 8 -16 -24, etc.
     */
    var multiplo = 8;
    var i = 1;

    do {
        document.write("T\érmino " + i + ": " + multiplo + "<br />");
        multiplo = 8 * ++i;

    } while (multiplo < 500);

    volver();
}



function ejer041() {

    /*
     * 41.	Desarrollar un programa que permita la carga de 5 valores por teclado utilizando una 
     * 		Ãºnica variable para dichos valores y nos muestre posteriormente la suma 
     */
    var suma = 0;
    for (var i = 0; i < 5; i++) {
        suma += parseInt(prompt("Introduce un n\úmero"));
    }
    alert("La suma vale " + suma);

}

