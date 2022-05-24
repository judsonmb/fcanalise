exports.doLogin = (req, res) => {
    req.session.userName = req.body.email
    req.session.flash = {
        type: 'success',
        intro: 'Feito!',
        message: 'Login realizado com sucesso!'
    }
    req.session.auth = {
        name: 'Judson Bandeira'
    }
    res.redirect(303, '/home')
}

exports.doLogout = (req, res) => {
    if (req.session) req.session.destroy();
    res.redirect(303, '/')
}