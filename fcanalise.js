//to get routes,
const pages = require('./modules/pages')
const userModule = require('./modules/user')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const { credentials } = require('./config')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const flashMiddleware = require('./middlewares/flash')
const authMiddleware = require('./middlewares/auth')

const app = express()

//set the Handlebars view engine
app.engine('handlebars', expressHandlebars.engine({
    //defining the main layout searching a file name called main in views/layouts directory
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000

//middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(cookieParser(credentials.cookieSecret))
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret
}))
app.use(flashMiddleware)
app.use(authMiddleware)

//routes
app.get('/', pages.showLoginPage)

app.get('/home', pages.showHomePage)

app.post('/login', userModule.doLogin)

app.get('/logout', userModule.doLogout)

//must be called after all others
app.use(pages.serverError)

app.use(pages.notFound)

//if executed by node (node fcanalise.js), 
//require.main === module; else, will be imported by other module (for tests)
if (require.main === module) {
    app.listen(port, () => console.log(
        `Express started on http://localhost:${port}; `
        + `press Ctrl+C to terminate.`
    ))
} else {
    module.exports = app
}
