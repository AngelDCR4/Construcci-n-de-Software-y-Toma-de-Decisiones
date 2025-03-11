//Importación de fs para escribir en txt
const fs = require('fs');
const http = require('http')

function promedio(numeros) {
//Si arreglo vacio entonces devolver 0
    if(numeros.length === 0) return 0;
//Promodio
    let suma = 0;
    for(let i = 0; i < numeros.length; i++){
        suma += numeros[i];
    }

    return suma/numeros.length;
}

// Prueba de la función
const numeros = [5, 2, 4, 5, 3, 2];
console.log("El promedio es:", promedio(numeros));

function escribir(prueba, contenido) {
    fs.writeFileSync(prueba, contenido);
    console.log(`Texto guardado en ${prueba}`);
    console.log(`Se escribio "${contenido}"`)
}

escribir('prueba_lab8', 'Esto es una prueba');

class Carrito {
    constructor() {
        this.productos = [];
    }

    agregarProducto(nombre, precio, cantidad) {
        this.productos.push({nombre, precio, cantidad});
        console.log(`Se agregaron ${cantidad} ${nombre} con un precio de  ${precio}`)
    }

    vercarrito(){
        console.log("\n Llevas: \n")
        this.productos.forEach((producto,indez) => {
            console.log(`${producto.cantidad} x ${producto.nombre}`)
        });
    }
}

const mi_carrito = new Carrito();
mi_carrito.agregarProducto("Piña",34,2);
mi_carrito.agregarProducto("Platano",25,5);
mi_carrito.agregarProducto("Manzana",20,10);
mi_carrito.vercarrito();

const server = http.createServer((req, res) => {
    if(req.url === "/" || req.url === "/index"){
        fs.readFile("index.html", (err, data) => {
            if (err) {
                res.writeHead(500, {"content-type": "text/plain"});
                res.end("Error en HTML");
            } else {
                res.writeHead(200, {"content-type": "text/HTML"});
                res.end(data);
            }
        });
    } else {
        res.writeHead(404, {"content-type": "text/plain"});
        res.end("Pagina no encontrada")
    }
});

server.listen(3000, () => {
    console.log("Iniciando servidor en http://localhost:3000");
});