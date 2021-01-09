var express = require('express');
var ElectrionResultController = require('../controller/resultController')
var router = express.Router();

/**
   * GET Polling units total result
   */
  router.post('/', ElectrionResultController.lgaResult);



module.exports = router;