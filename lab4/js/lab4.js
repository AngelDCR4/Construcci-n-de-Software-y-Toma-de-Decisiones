//Prueba de java funcionando
console.log("XD");

/* EJERCICIO 1*/
function mostrartabla() {
    //Solicitar número
    let numero = parseInt(prompt("Por favor ingrese un número para la tabla:"));
    
    //Creación de la tabla
    //documento.write permite escribir texto, resultados de operaciones en HTML
    //Dentro de las comillas va lo que se escribir en HTML
    document.write("<table border = '1'><tr><th>Número</th><th>Cuadrado</th><th>Cubo</th>");

    for(let i = 1; i <= numero; i++){
        document.write("<tr>");
        document.write("<td>" + i + "</td>"); //concatenar para tener en html [<td>i</td>]
        document.write("<td>" + i ** 2 + "</td>"); //cuadrado
        document.write("<td>" + i ** 3 + "</td>"); //cubo
        document.write("</tr>");
    }

    document.write("</table>")
}

//mostrartabla();

/*EJERCICIO 2 */

function suma_aleatoria() {
          //Math.floor redondea un numero
                     //Math.random genera número aleatorio
    let a = Math.floor(Math.random() * 10) + 1; //Se coloca el *10 para generar números de [ 0,10 ) -> 0, 1, 2... hasta 9.999
    let b = Math.floor(Math.random() * 10) + 1; //Math.floor redondea el número random y se suma 1 para no dar el número 0 [ 1,10 ]

    //Toma de tiempo
    let tiempo = new Date().getTime();

    //Solicitud de respuesta
    let res = parseInt(prompt("¡¡RAPIDO!! ¿Cuanto es " + a + " + " + b + "?"));
    
    //Fin de toma de timepo
    let tiempofinal = new Date().getTime();
    
    //Calcular tiempo total
    let tiempototal = (tiempofinal - tiempo) / 1000; //se divide para tener los microsegundos

    //Validar respuesta
    if (res === (a + b)){
        document.write(`¡ES CORRECTO! | La suma de ${a} + ${b} es <b>${a + b}<b><br>`);
    } else {
        //El ${} se usa para crear una sola cadena de texto en lugar de concatenar con + +
        document.write(`Es incorrecto :c | La respuesta es <b>${a + b}<b><br>`);
    }

    //Mostrar tiempo
    document.write(`Tiempo tomado: ${tiempototal} segundo`);
}

suma_aleatoria();