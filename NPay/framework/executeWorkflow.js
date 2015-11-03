// @auther: love_taneja
/**
This is the file to execute a given workflow. It is a 3 step process.
*/
var logger = require('./logger.js');
var executeWorkflow = function(workflowName){
	// Load framework functions
	var wf = require('../framework/getWorkflowName.js')
	var sv = require('../framework/getNextServiceName.js')
	var es = require('../framework/executeService.js');
	// Callback for Step 1
	var workflowCallback = function (err, wfName) {
		if (err) return logger.error('Error Message is ' + err);
		// Callback for Step 2
		var nextServiceCallback = function (err, service) {
			if (err) return logger.error('Error Message is ' + err);
			// Callback for Step 3
			var executeServiceCallback = function (err, service, status) {
				if (err) return logger.error('Error Message is ' + err);
				/*
				###############################################################
				STEP 2: Get the next service to be executed in a given workflow
				###############################################################
				*/
				if (service!=''){
					sv.getNextService(wfName, service, status, nextServiceCallback);	
				}
			}			
			/*
			###################################################################
			STEP 3: Execute the service
			###################################################################
			*/
			if (service!=''){
				es.executeService(service, executeServiceCallback);	
			}			
		};
		if (wfName!=''){
			sv.getNextService(wfName, 'firstService', 'success', nextServiceCallback);
		}else{
			logger.error('Workflow is not configured');
		}
	};
	/*
	#############################################################################
	STEP 1: Get the workflow name
	#############################################################################
	*/
	wf.getWorkflowName(workflowName, workflowCallback);
};
exports.executeWorkflow = executeWorkflow;