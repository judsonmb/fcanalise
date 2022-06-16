module.exports = {
    getAnalyses: async (options = {}) => {
        const analyses = [
            {
                id: 1,
                status: 'Finished',
                applicants: [
                    {
                        id: 1,
                        name: 'Fulano de Tal',
                        type: 'Guarantor',
                        income: 5300
                    },
                    {
                        id: 2,
                        name: 'Beltrano de Tal',
                        type: 'Tenant',
                        income: 1500
                    }
                ],
                tenancy: {
                    id: 1,
                    type: 'Residential',
                    price: 600,
                    location: {
                        search: 'Hood River, Oregon, USA'
                    }
                }
            },
            {
                id: 2,
                status: 'Started',
                applicants: [
                    {
                        id: 3,
                        name: 'Ciclano de Tal',
                        type: 'Guarantor',
                        income: 8000
                    },
                    {
                        id: 4,
                        name: 'Zilano de Tal',
                        type: 'Tenant',
                        income: 3000
                    }
                ],
                tenancy: {
                    id: 1,
                    type: 'Residential',
                    price: 1600,
                    location: {
                        search: 'Maceió, Alagoas, Brazil'
                    }
                }
            },
        ]
        // if the option "status" will specified, only the 
        //corresponding analyzes will be returned
        if(options.status !== undefined)
            return reports.filter(({status}) => status === options.status)
        return reports
    },

    addAnalysisListener: async (email, sku) => {
        //after
    }
}