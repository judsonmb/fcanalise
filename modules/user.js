const email = require('./email')

exports.login = async (req, res) => {
    req.session.userName = req.body.email
    req.session.flash = {
        type: 'success',
        intro: 'Feito!',
        message: 'Login realizado com sucesso!'
    }
    req.session.auth = {
        name: 'Judson Bandeira'
    }
    
    await email.send(req.body.email)
    
    res.redirect(303, '/home')
}

exports.logout = (req, res) => {
    if (req.session) req.session.destroy();
    res.redirect(303, '/')
}