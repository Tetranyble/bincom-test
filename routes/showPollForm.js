var express = require('express');
var ElectrionResultController = require('../controller/resultController')
var router = express.Router();

/**
   * GET Polling unit result
   */
  router.get('/', ElectrionResultController.storePollingUnitResult);



module.exports = router;