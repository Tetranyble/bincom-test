var express = require('express');
var ElectrionResultController = require('../controller/resultController')
var router = express.Router();

/**
   * GET Polling units total result
   */
  router.get('/', ElectrionResultController.allPollingUnitsInLocalGovermentResults);



module.exports = router;
