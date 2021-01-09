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
            models.announced_pu_results.findAll(
                { 
                    where: { polling_unit_uniqueid: 8 },
                    attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
                })
            .then(result => {
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
        allPollingUnitsInLocalGovermentResults: ( req, res ) =>{
            models.announced_lga_results.findAll({limit: 2, attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } })
            .then(result => {
                const resultSum = result.reduce((total, current) => total.dataValues.party_score + current.dataValues.party_score)
                res.render('resultSum', {title: 'L.G.A Polling Units Total Result', resultSum: resultSum})
            }).catch( error => {
                // return error page here. But for brevity am logging the error
                console.log(error.message, error)
            })
        },

        /**
         * Stores a pulling unit result
         * 
         * @param {*} req The request object 
         * @param {*} res The response object
         */
        storePollingUnitResult: ( req, res ) =>{},

        showPollingForm: (req, res) => {
            
            res.render('showPollForm', {})
        }
    }
}

module.exports = ElectrionResultController();