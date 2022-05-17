const express = require('express')
const expressHandlebars = require('express-handlebars')
const fortune = require('./lib/fortune')

const app = express()

//set the Handlebars view engine
app.engine('handlebars', expressHandlebars.engine({
    //defining the main layout searching a file name called main in views/layouts directory
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000

//routes
app.use(express.static(__dirname + '/public'))

//searches home in views directory. on the rest of routes happens the same
app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => {
    res.render('about', { fortune: fortune.getFortune() })
})

app.use((req, res) => {
    res.status(404)
    res.render('404')
})

app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500)
    res.render('500')
})

app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; `
    + `press Ctrl+C to terminate.`
))