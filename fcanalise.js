//to get routes,
const handlers = require('./lib/handlers')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const weatherMiddleware = require('./lib/middleware/weather')

const app = express()

//set the Handlebars view engine
app.engine('handlebars', expressHandlebars.engine({
    //defining the main layout searching a file name called main in views/layouts directory
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000

//middlewares
app.use(weatherMiddleware)

//routes
app.use(express.static(__dirname + '/public'))

app.get('/', handlers.login)

app.get('/about', handlers.about)

app.use(handlers.notFound)

app.use(handlers.serverError)

//if executed by node (node fcanalise.js), 
//require.main === module; else, will be imported by other module
if (require.main === module) {
    app.listen(port, () => console.log(
        `Express started on http://localhost:${port}; `
        + `press Ctrl+C to terminate.`
    ))
} else {
    module.exports = app
}
