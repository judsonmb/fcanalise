const cluster = require('cluster')

function startWorker() {
    const worker = cluster.fork()
    console.log(`CLUSTER: Worker ${worker.id} started`)
}

if (cluster.isMaster) {
    require('os').cpus().forEach(startWorker)

    //registers workers which they disconnected; if a worker disconnect,
    //it must be closed, soon, we will wait the event of closure
    //to generate a new worker for replace it
    cluster.on('disconnect', worker => console.log(
        `CLUSTER: Worker ${worker.id} disconnected from the cluster.`
    ))

    //when a worker is inactive (is closed),
    //creates a worker to replace it.
    cluster.on('exit', (worker, code, signal) => {
        console.log(
            `CLUSTER: Worker ${worker.id} died with exit ` +
            `code ${code} (${signal})`
        )
        startWorker()
    })

} else {
    const port = process.env.PORT || 3000
    //starts our app in worker, see the fcanalise.js
    require('./fcanalise.js')(port)
}