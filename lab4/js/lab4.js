
console.log("XD");

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

mostrartabla();

