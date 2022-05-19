const fortune = require('./fortune')

//searches home in views directory. on the rest of routes happens the same
exports.home = (req, res) => res.render('home')

exports.login = (req, res) => res.render('login')

exports.about = (req, res) => 
    res.render('about', { fortune: fortune.getFortune() })

exports.notFound = (req, res) => res.render('404')

//to disable the no unused vars in lint test (the var next is necessary)
/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => res.render('500')
/* eslint-enable no-unused-vars */