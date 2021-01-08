'use strict'
const models = require('../models');

const ElectrionResultController = () => {
    return {
        /**
         * Retrieves any pulling result
         * 
         * @param {*} req The request object 
         * @param {*} res The response object
         */
        pollingUnitResult: ( req, res ) => {
            models.announced_lga_results.findOne({ where: { result_id: 1 }, attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } })
            .then(result => {
                console.log(result)
                res.render('polling', {title: 'Polling Result', result: result})
            }).catch( error => {
                // return error page here. But for brevity am logging the error
                console.log(error.message, error)
            })
            
        },
        /**
         * Sums up all pulling units result given a local government
         * 
         * @param {*} req The request object 
         * @param {*} res The response object
         */
        allPollingUnitsInLocalGovermentResults: ( req, res ) =>{},

        /**
         * Stores a pulling unit result
         * 
         * @param {*} req The request object 
         * @param {*} res The response object
         */
        storePollingUnitResult: ( req, res ) =>{}
    }
}

module.exports = ElectrionResultController();