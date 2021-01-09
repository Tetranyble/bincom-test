'use strict'

const { QueryTypes } = require('sequelize')
const { models } = require('../models');
const db = require('../models');

const ElectrionResultController = {
    
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
            db.sequelize.query("SELECT l.lga_name, p.polling_unit_id, p.uniqueid, r.party_score, r.party_abbreviation FROM lga l, polling_unit p, announced_pu_results r WHERE l.uniqueid=p.lga_id AND p.uniqueid=r.polling_unit_uniqueid AND l.uniqueid=17", { type: QueryTypes.SELECT })
            .then( async (result) => {
                //const resultSum = result.reduce((total, current) => total.party_score + current.party_score )
                let resultSum = 0
                result.forEach(current => {
                    resultSum += current.party_score
                });
                const lga = await db.sequelize.query("SELECT * FROM lga", { type: QueryTypes.SELECT })
                res.render('resultSum', {title: `${result[0].lga_name} L.G.A Polling Units Total Result`, resultSum: resultSum, lga : lga})
            })
            .catch(error => console.log(error.message, error))
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
        },
        lgaResult: (req, res) => {
            db.sequelize.query(`SELECT l.lga_name, p.polling_unit_id, p.uniqueid, r.party_score, r.party_abbreviation FROM lga l, polling_unit p, announced_pu_results r WHERE l.uniqueid=p.lga_id AND p.uniqueid=r.polling_unit_uniqueid AND l.uniqueid=${req.body.lga_id}`, { type: QueryTypes.SELECT })
            .then( async (result) => {
                //const resultSum = result.reduce((total, current) => total.party_score + current.party_score )
                let resultSum = 0
                result.forEach(current => {
                    resultSum += current.party_score
                });
                const lga = await db.sequelize.query("SELECT * FROM lga", { type: QueryTypes.SELECT })
                res.render('resultSum', {title:  `${result[0].lga_name !== undefined ? result[0].lga_name : 'No result'} L.G.A Polling Units Total Result`, resultSum: resultSum, lga : lga})
            })
            .catch(error => console.log(error.message, error))

        }
    
}

module.exports = ElectrionResultController;