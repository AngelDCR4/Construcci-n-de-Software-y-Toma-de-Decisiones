//Este archivo contiene la lógica para interactuar con la API de Google Calendar
//y manejar la autenticación de OAuth2. Utiliza la biblioteca googleapis para facilitar la interacción con la API.

//Importar las dependencias necesarias
const { google } = require('googleapis'); //Importar la biblioteca googleapis para interactuar con la API de Google
require('dotenv').config(); //Cargar las variables de entorno desde el archivo .env

const oauth2Client = new google.auth.OAuth2(  //Crear una instancia de OAuth2Client
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

//Crear URL de autenticación
function getAuthURL() { //Esta función genera una URL de autorización para que el usuario inicie sesión y otorgue permisos a la aplicación
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar'],
  });
}

//Establecer tokens y obtener acceso al calendar
async function getCalendarEvents(code) {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  const res = await calendar.events.list({
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: 5,
    singleEvents: true,
    orderBy: 'startTime',
  });

  return res.data.items;
}

module.exports = { getAuthURL, getCalendarEvents };
