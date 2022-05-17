const fortune = require('./fortune')

//searches home in views directory. on the rest of routes happens the same
exports.home = (req, res) => res.render('home')

exports.about = (req, res) => 
    res.render('about', { fortune: fortune.getFortune() })

exports.notFound = (req, res) => res.render('404')

exports.serverError = (err, req, res, next) => res.render('500')