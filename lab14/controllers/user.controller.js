exports.get_login = (req, res) => {
    res.render('login.ejs', { titulo: 'Login'});
};