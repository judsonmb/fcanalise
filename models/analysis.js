const mongoose = require('mongoose')

const analysisSchema = mongoose.Schema({
    id: Number,
    status: String,
    applicants: [{
        id: Number,
        name: String,
        type: String,
        income: Number
    }],
    tenancy: {
        id: Number,
        type: String,
        price: Number,
        location: {
            search: 'Maceió, Alagoas, Brazil',
            coordinates: {
                lat: Number,
                lng: Number
            },
        },
    },
    risk: String
})

const Analysis = mongoose.model('Analysis', analysisSchema)
module.exports = Analysis