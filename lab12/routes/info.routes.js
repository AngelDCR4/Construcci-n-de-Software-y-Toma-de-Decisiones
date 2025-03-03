const express = require('express');
const router = express.Router();

//PAGINA ACERCA DE
router.get('/about', (req, res) => {
    res.render('about', { titulo: 'Acerca de Nosotros' });
});

//PAGINA DE SERVICIOS
router.get('/services', (req, res) => {
    res.render('services', { titulo: 'Nuestros Servicios' });
});

//PAGINA DE PREGUNTAS FRECUENTES
router.get('/faq', (req, res) => {
    res.render('faq', { titulo: 'Preguntas Frecuentes' });
});

module.exports = router;