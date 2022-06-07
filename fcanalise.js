//to get routes,
const pages = require('./modules/pages')
const userModule = require('./modules/user')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const { credentials } = require('./config')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
//const MemoryStore = require('memorystore')(expressSession)
const flashMiddleware = require('./middlewares/flash')
const authMiddleware = require('./middlewares/auth')
const morgan = require('morgan')
const fs = require('fs')
const cluster = require('cluster')

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
    // store: new MemoryStore({
    //     checkPeriod: 86400000 // prune expired entries every 24h
    // }),
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret
}))
app.use(flashMiddleware)
app.use(authMiddleware)

//logging
switch(app.get('env')) {
    case 'development':
        app.use(morgan('dev'))
        break
    case 'production':
        const stream = fs.createWriteStream(__dirname + '/access.log',
            {flags: 'a'})
        app.use(morgan('combined', {stream}))
        break
}

//cluster workers 
app.use((req, res, next) => {
    if (cluster.isWorker) {
        console.log(`Worker ${cluster.worker.id} received request`)
    }
    next()
})

//routes
app.get('/', pages.showLoginPage)

app.get('/home', pages.showHomePage)

app.post('/login', userModule.login)

app.get('/logout', userModule.logout)

//must be called after all others
app.use(pages.serverError)

app.use(pages.notFound)

//uncaught exception
process.on('uncaughtException', err => {
    console.error('UNCAUGHT EXCEPTION\n', err.stack)
    // do cleaning that you needs here...close
    // database connections, and others
    process.exit(1)
})

//if executed by node (node fcanalise.js), 
//require.main === module; else, will be imported by other module (for tests)
function startServer(port) {
    app.listen(port, function(){
        console.log(
            `Express started in ${app.get('env')} ` 
            + `mode at http://localhost:${port}; `
            + `press Ctrl+C to terminate.`
        )
    })
}


if (require.main === module) {
    //the application is executed directly; start the server of app
    startServer(process.env.port || 3000)
} else {
    //the application is imported as a module with 'require':
    //exports the function which starts the server
    module.exports = startServer
}
