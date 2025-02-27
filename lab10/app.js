const fs = require('fs');
const http = require('http');
const personajes = [];



const main = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>LAB10</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css">
  </head>
  <body>
    <br>
    <h1><b>SEGUNDA PAGINA</b></h1>

    <br>
    <br>

    <form action="/extra" method="POST">
            <div class="field">
              <p class="control has-icons-left">
                <input class="input" type="password" name="password" placeholder="Password">
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <br>
            <br>
            <div class="field">
              <p class="control">
                <button class="button is-success" type="submit">Login</button> 
              </p>
            </div>
          </form>
  </body>
</html>
`;

const html_main = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>LAB10</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css">
  </head>
  <body>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="https://bulma.io">
            <svg width="640" height="160" viewBox="0 0 640 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0 110L10 40L50 0L100 50L70 80L110 120L50 160L0 110Z" fill="#00D1B2"/>
            </svg>
          </a>
        </div>
    </nav>

  <section class="section">
    <div class="container">
      <h1 class="title is-2">Primera página</h1>
        <h2 class="title is-2">Inserta un nombre</h2>
          
          <form action="/new" method="POST">
            <div class="field">
              <p class="control has-icons-left">
                <input class="input" type="text" name="nombre" placeholder="Jacob">
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>
          </form>
    </div>
  </section>
  </body>
</html>
`;

//height = Asegura que el div ocupe toda la pantalla
const extra = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>LAB10</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css">
  </head>
  <body>
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
      <h1 style="text-align: center;">TERCERA PÁGINA</h1>
    </div>
  </body>
</html>
`;

const html_card=`<div style="margin-top:30px;" class="card";>
  <div class="card-content">
    <div class="content">
      
    `

const html_footer =`<br>
        </div>
      </div>
  </div>`




//Antes si la pagina no encontraba la ruta mandaba al main por predeterminado
//Ahora si la ruta no existe se mandara a un error 404
  const server = http.createServer((request, response) => {
    if (request.method === "GET") {
      if (request.url === "/") {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(html_main);
        response.end();
        //Si no se encuentra la ruta se despliega un error 404
      } else {
        response.writeHead(404, { "Content-Type": "text/html" });
        response.write("<h1 style='text-align: center;'>404 - Pagina no encontrada</h1>");
        response.end();
      }
      
    } else if (request.method === "POST") {
      //Captura de datos enviados en POST
      const datos = [];
      request.on("data", (dato) => {
        datos.push(dato);
      });
      //
      request.on("end", () => {
        if (request.url === "/new") {
          const datos_completos = Buffer.concat(datos).toString();
          personajes.push(datos_completos.split("=")[1]);
          response.writeHead(200, { "Content-Type": "text/html" });
          response.write(main);
  
          response.write('<div class="columns is-multiline">');
          for (const personaje of personajes) {
            response.write(`
              <div class="column is-one-quarter">
                <div style="margin-top:30px; padding: 5px 15px 5px 15px;" class="card">
                  <div class="card-content">
                    <div class="content">
                      ${personaje}
                    </div>
                  </div>
                </div>
              </div>
            `);
          }
          response.end();
        } else if (request.url === "/extra") {
          response.writeHead(200, { "Content-Type": "text/html" });
          response.write(extra);
          response.end();
        
        //Si la URL no es /new ni /extra se envia error 404
        } else {
          response.writeHead(404, { "Content-Type": "text/html" });
          response.write("<h1 style='text-align: center;'>404 - Página no encontrada</h1>");
          response.end();
        }
      });
    }
  });
  

server.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
