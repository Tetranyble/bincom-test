var express = require('express');
var ElectrionResultController = require('../controller/resultController')
var router = express.Router();

  /**
   * GET home page. 
   */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Delta State Election Result Coalition', body: 'Delta State INEC election result coalition'});
  });
  



module.exports = router;
