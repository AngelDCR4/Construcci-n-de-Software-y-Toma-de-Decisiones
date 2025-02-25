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
    <h1><b>Hola Mundo a todo</b></h1>

    <br>
    <br>

    <div class="columns">
      <div class="column"><figure class="image is-128x128">
      <img class="is-rounded" src="C:\\Users\\angel\\Documents\\C++\\.vscode\\Construcci-n-de-Software-y-Toma-de-Decisiones\\lab10\\jacob.jpg'">
        </figure>
</div>
      <div class="column"> 
      <figure class="image is-128x128">
        <img class="is-rounded" src="rolon.jpg" alt="Imagen de rolon">
      </figure></div>
    </div>

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
        <h1 class="title is-1">Inserta un nombre</h1>
          
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
    <h1>Hola tonotos </h1>
  </body>
</html>
`;

const html_card=`<div style="margin-top:30px;" class="card">
  <div class="card-content">
    <div class="content">
      
    `

const html_footer =`<br>
        </div>
      </div>
  </div>`





const server = http.createServer((request, response) => {
  if (request.method === "GET") {
    response.writeHead(200, { "Content-Type": "text/html" }); 
    response.write(html_main);
    response.end();
  } else if (request.method === "POST") {
    const datos = [];
    request.on('data',(dato)=>{
      console.log(dato);
      datos.push(dato);
    })


    request.on("end", () => {
      if(request.url=="/new"){
        const datos_completos = Buffer.concat(datos).toString();
        console.log(datos_completos);
        personajes.push(datos_completos.split('=')[1]);
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(main);
        response.write('<div class="columns">');
        for(const personaje of personajes){
          response.write(html_card);
          response.write(personaje);
          response.write(html_footer);
          response.write('</div');
        }


        response.end();
      }else if(request.url=="/extra"){
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(extra)
        response.end();
      }
      
    });
  }
});

server.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
