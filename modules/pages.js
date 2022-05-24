//searches login in views directory. on the rest of routes happens the same
exports.showLoginPage = (req, res) => {
    if (req.session.auth) res.redirect(303, '/home')
    res.render('login', { csrf: 'AscahEFmvSk##sSuhl'})
}

exports.showHomePage = (req, res) => {
    if (!req.session.auth) res.redirect(303, '/')
    res.render('home')
}

exports.notFound = (req, res) => res.render('404')

//to disable the no unused vars in lint test (the var next is necessary)
/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => res.render('500', {error: err})
/* eslint-enable no-unused-vars */