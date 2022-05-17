//to get routes,
const handlers = require('./lib/handlers')
const express = require('express')
const expressHandlebars = require('express-handlebars')

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

app.get('/', handlers.home)

app.get('/about', handlers.about)

app.use(handlers.notFound)

app.use(handlers.serverError)

app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; `
    + `press Ctrl+C to terminate.`
))