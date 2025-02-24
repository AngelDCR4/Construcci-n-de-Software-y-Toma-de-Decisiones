const fs = require('fs');
const http = require('http');

const main = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>LAB10</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css">
  </head>
  <body>
    <h1>Hola Mundo a todods  </h1>
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
        <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input class="input" type="email" name="email" placeholder="Email">
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </p>
          </div>
          
          <form action="/" method="POST">
            <div class="field">
              <p class="control has-icons-left">
                <input class="input" type="password" name="password" placeholder="Password">
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control">
                <button class="button is-success" type="submit">Login</button> 
              </p>
            </div>
          </form>
    </div>
  </section>
  </body>
</html>
`;

const server = http.createServer((request, response) => {
  if (request.method === "GET") {
    response.writeHead(200, { "Content-Type": "text/html" }); 
    response.write(html_main);
    response.end();
  } else if (request.method === "POST") {
    let body = "";

    request.on("data", chunk => {
      body += chunk.toString();
    });

    request.on("end", () => {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(main);
      response.end();
    });
  }
});

server.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
