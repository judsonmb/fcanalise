//searches login in views directory. on the rest of routes happens the same
exports.showLoginPage = (req, res) => res.render('login', { csrf: 'AscahEFmvSk##sSuhl'})

exports.showHomePage = (req, res) => res.render('home')

exports.notFound = (req, res) => res.render('404')

//to disable the no unused vars in lint test (the var next is necessary)
/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => res.render('500')
/* eslint-enable no-unused-vars */

//process routes
exports.login = (req, res) => {
    console.log('CSRF token (from hidden from field): ' + req.body._csrf)
    console.log('Email (from visible form field): ' + req.body.email)
    console.log('Password (from visible form field): ' + req.body.password)
    res.cookie('monster', 'nom nom')
    res.cookie('signed_monster', 'nom nom nom', {signed:true})
    req.session.userName = req.body.email
    req.session.flash = {
        type: 'success',
        intro: 'Feito!',
        message: 'Login realizado com sucesso!'
    }
    res.redirect(303, '/home')
}