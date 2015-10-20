// @auther: love_taneja
/**
This is the REST Controller.
*/

// Call the packages we need
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
// Define the logger
var logger = require('../framework/logger.js');

// Configure app to use bodyParser()
// This will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure application port
var port = process.env.PORT || 8080;

// ROUTES FOR OUR API
var router = express.Router();

// TAX API. URL = http://localhost:8080/api/tax
router.get('/tax', function(req, res) {
	var ew = require('../framework/executeWorkflow.js');
	ew.executeWorkflow('TAX');
    res.json({ message: 'Welcome to TAX api!' });   
});

/** reloadRules API
URL1 = http://localhost:8080/api/reloadRules?ruleFileName=getWorkflowName
URL2 = http://localhost:8080/api/reloadRules?ruleFileName=getNextServiceName
*/
router.get('/reloadRules', function(req, res) {
	var ruleFileName = req.query.ruleFileName;
	logger.debug('Starting reloading of rules for ' + ruleFileName);
	if (ruleFileName == 'getWorkflowName'){
		var wf = require('../framework/getWorkflowName.js');
		wf.reloadRules();
	} else if (ruleFileName == 'getNextServiceName'){
		var nsn = require('../framework/getNextServiceName.js');
		nsn.reloadRules();
	}
	logger.debug('Rules reloaded successfully for ' + ruleFileName);
    res.json({ message: 'Rules Reloaded' });
});

// REGISTER OUR ROUTES
// All of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
app.listen(port);
console.log('Application Started on port ' + port);