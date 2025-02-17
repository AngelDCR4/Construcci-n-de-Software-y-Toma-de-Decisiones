//Prueba de java funcionando
console.log("XD");

/************* 
EJERCICIO 1
**************/
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

/************* 
EJERCICIO 2
**************/

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

//suma_aleatoria();

/************* 
EJERCICIO 3
**************/

function contador(arr) {
    //contadores
    let ceros = 0;
    let negativos = 0;
    let positivos = 0;

    for(let i=0; i < arr.length; i++){
        if(arr[i] == 0){
            ceros++;
        } else if(arr[i] < 0){
            negativos++;
        } else if(arr[i] > 0){
            positivos++;
        }
    }

    //Retorno de objetos con resultados
    return{
        ceros:ceros,
        negativos:negativos,
        positivos:positivos
    };
}

/* 
//Pruebas Ejemplo
console.assert(
  //Json.stringify convierte un objeto en una cadena de texto en formato JSON
    JSON.stringify(contador([-2,-1,0,1,2,3])) === JSON.stringify({ceros:1,negativos:2,positivos:3}),
  //En caso de error
    "Error en la prueba del arreglo 1"
);

console.assert(
    JSON.stringify(contador([-1, 0, 5])) === JSON.stringify({ceros:1, negativos:1, positivos:1}),
    "Error en la prueba del arreglo 2"
);
*/

/************* 
EJERCICIO 4
**************/

function promedios(matrix){

    let resultados = [];

    for(let i = 0; i < matrix.length; i++){
        let subarr = matrix[i]; //Sub arreglo del arreglo
        let suma = 0;
        for(let j = 0; j < subarr.length; j++){
            suma += subarr[j];
        }
        let promedio = parseFloat((suma / subarr.length).toFixed(1)); //Redondear promedios
        resultados.push(promedio);
    }

    return resultados;
}

/*Pruebas Ejercicio 4
console.assert(
    JSON.stringify(promedios( [[1,1,1,1],[2,4,6,10]] )) === JSON.stringify([1, 5.5] ),
    "Error en la prueba de promedios 1"
);
console.assert(
    JSON.stringify(promedios( [[22,2,42,32],[5,3,8,7,4,1],[2,8,4]] )) === JSON.stringify([24.5, 4.7, 4.7] ),
    "Error en la prueba de promedios 2"
);
*/

/************* 
EJERCICIO 5
**************/

function inverso(num) {
    //Convertir num en valor absoluto
    let num_ab = Math.abs(num).toString();
    
    //num.split("") -> Hace que la cadena se separe en un arreglo de caracteres
    //.reverse() -> Invierte el orden de los caracteres del arreglo
    //.join("") -> Hace que el arreglo se quede en una sola cadena de caracteres
    let str_rev = num_ab.split("").reverse().join("");

    //Convertir cadena en valores enteros
    let num_rev = parseInt(str_rev);

    //OPERADOR TERNARIO (if recortado)
    //num < 0 | es la condición
    //?       | Si la condición es verdadera
    //:       | Si la condición es falsa
    //Si el numero ingresado es negativo se agrega - al numero inverso
    return num < 0 ? -num_rev : num_rev;
}

/*
console.assert(inverso(12345) === 54321, "Error prueba 1");
console.assert(inverso(-573) === -375, "Error prueba 2");
console.assert(inverso(-212) === -212, "Error prueba 3");
console.log("Pruebas inversas completadas");
*/

/************* 
EJERCICIO 6 - Carrito de compras y costo total de productos
**************/

class Carrito_compras {
    //Constructor
    constructor() {
        this.lista = [];
    }
    //Metodos
    agregar_producto(nombre,precio) {
        this.lista.push( {nombre,precio} );
    }
    costo_total() {
        let total = 0;
        for(let producto of this.lista) {
            total += producto.precio;
        }
        return total;
    }
}

//Pruebas de Carrito_compras

let carrito_rolon = new Carrito_compras();
carrito_rolon.agregar_producto("Platanos",35);
carrito_rolon.agregar_producto("Leche",25);
carrito_rolon.agregar_producto("Caja huevo", 55);
carrito_rolon.agregar_producto("2kg de carne", 300)

let total = carrito_rolon.costo_total();
document.write("El costo total es " + total);