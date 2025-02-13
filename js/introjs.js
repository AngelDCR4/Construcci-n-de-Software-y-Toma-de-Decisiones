//Consola (log, info, warn, error, assert)
/* 
console.log("hola mundo wookie!"); //Imprimir variables
console.info("Aquí andamos aprendiendo"); //Coloca información en la consola
console.warn("XDD");  //Manda una alerta en la consola(amarillo)
console.error("Wuuuuuuuueenenenn"); //Manda un error en la consola
console.assert(1 == 1);
console.assert(1 === 1);
console.assert(1 == "1");
console.assert(1 === "1");
console.assert(1 == true);
console.assert(1 === true);
*/

//Variables, constantes
var wookie = "Cheewbaca"; //forma antigua, no es tan segura, permite que el cliente modifique la variable

let otro_wookie = "Tarful"; //forma moderna, permite que el cliente no pueda modificar la variable

console.log(otro_wookie);

const precio = 99.99;

//Alcance de las variables

for (let i = 0; i < 10; i++){
    console.log(i);
}

//Alert, prompt, confirm

alert("wadsad"); // Nos permite poner un mensaje en la pantalla y hay que picarle en aceptar}

const nombre = prompt("¿Cómo te llamas?"); //Permite interactuar con el usuario y dar un valor a la variable

const is_hambre = confirm("¿Tienes hambre?"); //Permite interactuar con el usuario y dar un valor T/F a la variable

//Funciones tradicionales
function imprime_status() {
    let respuesta = "";
    if(is_hambre) {
        respuesta = " tiene hambre";
    }
    console.log(nombre + respuesta)
}

imprime_status();

//Funciones modernas

//() -> {}

