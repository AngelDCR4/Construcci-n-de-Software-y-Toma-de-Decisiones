const express = require('express');
const router = express.Router();
const { getAuthURL, getCalendarEvents } = require('../util/calendar');

// Ruta protegida
router.get('/calendar', async (req, res) => {
    try {
        const events = await getCalendarEvents(); // Obtener eventos desde API
        res.render('calendar', { titulo: 'Calendario', events }); // Renderiza la vista con eventos
    } catch (error) {
        console.error('Error al obtener eventos del calendario:', error);
        res.status(500).send('No se pudo cargar el calendario');
    }
});



// Redirige al login de Google
router.get('/auth/google', (req, res) => {
    const url = getAuthURL();
    res.redirect(url);
});

router.get('/auth/google/callback', async (req, res) => {
    const code = req.query.code;

    try {
        const events = await getCalendarEvents(code); // Ahora sí pasas el código
        res.render('calendar', { titulo: 'Calendario', events });
    } catch (error) {
        console.error("Error al obtener eventos:", error);
        res.status(500).send("No se pudo cargar el calendario");
    }
});


module.exports = router;
