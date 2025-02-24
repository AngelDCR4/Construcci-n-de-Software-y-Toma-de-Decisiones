//Definicion de constantes para el login
//value.trim ayuda a quitar los espacios en blanco al inicio y al final
const email = document.getElementById("email").value.trim();
const contra = document.getElementById("password").value.trim();
const boton = document.getElementById("boton");

//Credenciales validas
const correovalido = '1234@gmail.com';
const contravalido = '12345';
/* 
addEventListener sirve para que un objeto como un boton provoque un evento
'submit' indica que esta escuchando el evento del envio de formulario
(event) => es una funcion flecha que ejecuta cuando el formulario es enviado
*/
boton.addEventListener('click', (event)=>{

//verificación de usuario y contraseña
let usuario = document.getElementById('email').value.trim();
let contraseña = document.getElementById('password').value.trim();

//Detiene la recarga de la página
//event.preventDefault();

if (usuario === correovalido && contraseña === contravalido){
    alert("Inicio de sesion exitoso");
    
    document.body.innerHTML = `
    <h2>¿Por qué es una buena práctica usar JavaScript para checar que sean válidos los inputs de las formas antes de enviar los datos al servidor?</h2>
    <p>Se recomienda validar los inputs ya que permite corregir a los usuarios sin respuesta del servidor corrigiendo problemas asociados a campos vacios, formatos incorrectos etc. De esta manera evitamos solicitudes innecesarias, optimizando el rendimiento del sistema</p>
    <h2>¿Cómo puedes saltarte la seguridad de validaciones hechas con JavaScript?</h2>
    <p>Deshabilitando JavaScript en el navegador</p>
    <p>Manipulando el código de la consola del navegador</p>
    <p>Editando el HTML antes de enviarlo</p>
    <p>Interceptando la petición con un proxy</p>
    <h2>Si te puedes saltar la seguridad de las validaciones de JavaScript, entonces ¿por qué la primera pregunta dice que es una buena práctica?</h2>
    <p>Las validaciones no dejan de ser una buena practica ya que mejora la usabilidad y eficiencia además de corregir datos que se ingresaron erroneamente</p>
    `;


} else if (usuario === "" || contraseña === contravalido){
    alert("Por favor llene los campos solicitados");
} else {
    alert("Usuario o contraseña incorrectos");
}
})

//DOMContentLoaded ayuda a que cargue todo el HTML primero para luego ejecutar el codigo
document.addEventListener("DOMContentLoaded", () => {
    const botonAyuda = document.getElementById("mostrar-ayuda");
    const infoayuda = document.getElementById("ayuda");
    const texto = document.getElementById("texto-cambiar");

    botonAyuda.addEventListener("click", () => {
    /*
     style.display indica si "none" (Oculto - no esta en la pagina)
     style.display -> true -> indica "block" (Visible - aparece en la pagina como bloque)
     innerHTML modifica el div agregando texto HTML dinamicamente
     */
        if (infoayuda.style.display === "none"){
            infoayuda.style.display = "block";
            infoayuda.innerHTML = 
            `
            <p><strong>Credenciales válidas:</strong></p>
                <ul>
                    <li><strong>Email:</strong> 1234@gmail.com</li>
                    <li><strong>Contraseña:</strong> 12345</li>
                </ul>
                <p>Ingresa estas credenciales para iniciar sesión de prueba.</p>
            `;

            texto.textContent = "Ahora te vigilo más de cerca...";
            texto.style.color = "red"; //Cambiar clor a rojo
            texto.style.fontSize = "30px"; //Agrandar texto
            texto.style.fontWeight = "bold" //Cambiar a negritas

        } else {
            //Oculta la informacion si ya esta disponible
            infoayuda.style.display = "none";
            //Regresar texto normal
            texto.textContent = "Siempre te vigilo..."; 
            texto.style.color = "black"; 
            texto.style.fontSize = "16px"; 
        }
    });
    texto.addEventListener("mouseover", () => {
        texto.textContent = "No es cierto"
        texto.style.color = "white";
        texto.style.fontSize = "30px";
        texto.style.fontWeight = "bold"
    });

    texto.addEventListener("mouseout", () => {
        texto.style.color = "black";
        texto.style.fontSize = "16px";
        texto.style.fontWeight = "normal";
    });
});