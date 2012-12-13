console.log("MOCKREQUESTHANDLER REACHED!")

// NOT USED FOR DEMO:
function getRevisions(token, formID){
	if (formID == 12345){
		var JSONvar = {status:true, ErrMsg:undefined, value:"Insert Revisions Here"};
	}
	else{
		var JSONreturn = {status:false, ErrMsg:"There has been an error", value: undefined};
	}
	console.log("getRevisions Called")
	console.log(JSONvar);
	return JSONvar;
}

// USED FOR DEMO: (In reality there would be a formid but not for the demo)
exports.getForm = function getForm(token, applicationID){
	if (applicationID== 12345){
		var JSONvar = {status:true, ErrMsg:undefined, value: {fid: 12345, rid: 0.0, lastEditBy: "jfrancis", proposalTitle:" Effect of Rat Consumption on College Students", shortTitle: "Rats", formA2: 11111, formA3: 11112, formA4: 11113, formA5: 11114,   formA6: 11115, formA7: 11116, formA8: 11117, formA9: 11118, formA10: 11119, formA11: 11120, formA12: 11121,formA13: 11122}};
	}
	else{
		var JSONreturn = {status:false, ErrMsg:"There has been an error", value: undefined};
	}
	return JSONvar;
}
// NOT USED FOR DEMO:
 function retrieveAllFormsForApplication(token, applicationID){
	if (applicationID == 12345){
		var JSONvar = {status:true, ErrMsg:undefined, value: "Insert Forms Here"};
	}
	else{
		var JSONreturn = {status:false, ErrMsg:"There has been an error", value: undefined};
	}
	return JSONvar;
}

// USED FOR DEMO:
exports.retrieveAllApplicationsForPI = function retrieveAllApplicationsForPI(token, username){
	if (username == "jfrancis"){
		var JSONvar = {status:true, ErrMsg:undefined, value: {aid: 12345, rid: 12345,  proposalTitle:" Effect of Rat Consumption on College Students", uid: 12345, fid: 12345, frid: 1.0, lastEditBy:" jfrancis"}};
	}
	else{
		var JSONreturn = {status: false, ErrMsg:"There has been an error", value: undefined};
	}
	return JSONvar;
}

// NOT USED FOR DEMO
 function retrieveAllFormsForCI(token, username){
	if (username == "jfrancis"){
		var JSONvar = {status:true, ErrMsg:undefined, value: "Insert Forms Here"};
	}
	else{
		var JSONreturn = {status: false, ErrMsg:"There has been an error", value: undefined};
	}
	return JSONvar;
}

// NOT USED FOR DEMO:
 function createNewApplication(token){
	var JSONvar = {status:true, ErrMsg:undefined, value:true};
	return JSONvar;
}

// USED FOR DEMO:
exports.saveForm= function saveForm(token, formID, form){
	if (formID == 12345){
		var JSONvar = {status:true, ErrMsg:undefined, value:true};
	}
	else{
		var JSONvar = {status:false, ErrMsg:"Generic error, invalid formID", value:true};
	}
	return JSONvar;
}

// NOT USED FOR DEMO:
 function delegateApplication(token, username, applicationID, formID){
	if (formID == 12345){
		var JSONvar = {status:true, ErrMsg:undefined, value:true};
	}
	else{
		var JSONvar = {status:false, ErrMsg:"Generic error, invalid formID", value:true};
	}
	return JSONvar;
}

// NOT USED FOR DEMO:
function addCIs(Token, ApplicationID, CIList){
	if (applicationID == 12345){
		var JSONvar = {status:true, ErrMsg:undefined, value:true};
	}
	else{
		var JSONvar = {status:false, ErrMsg:"Generic error, invalid applicationID", value:true};
	}
	return JSONvar;
}

// NOT USED FOR DEMO:
 function removeForms(token, applicationID, formIDs){
	if (applicationID == 12345){
		var JSONvar = {status:true, ErrMsg:undefined, value:true};
	}
	else{
		var JSONvar = {status:false, ErrMsg:"Generic error, invalid applicationID", value:true};
	}
	return JSONvar;
}

// USED FOR DEMO:
exports.changeApplicationStatus = function changeApplicationStatus(token, applicationID, newStatus){
	if (applicationID = 12345)
		var JSONvar = {status:true, ErrMsg:undefined, value:true};
	else
		var JSONvar = {status:false, ErrMsg:"Generic error, invalid applicationID", value:true};
	return JSONvar;
}

// NOT USED FOR DEMO:
 function getPIOfApp(token, applicationID){
	if (applicationID == 12345){
		var JSONvar = {status:true, ErrMsg:undefined, value : {uid: "", username:"jfrancis", first_name:"John", last_name:"Francis", email: "jf@email.com", telephone: "555-555-5555", pager_number:"555-555-5555", fax:"555-555-5555"}};
	}
	else{
		var JSONreturn = {status: false, ErrMsg:"There has been an error", value: undefined};
	}
	return JSONvar;
}

// PROBABLY NOT USED FOR DEMO:
function addAsReviewer(token, applicationID, reviewers){
	var JSONvar = {status:true, ErrMsg:undefined, value:true};
	return JSONvar;
}

// NOT USED FOR DEMO:
function createNewUser(username, userData){
	var JSONvar = {status:true, ErrMsg:undefined, value:true};
	return JSONvar;
}

// USED FOR DEMO:
exports.submitApplication=  function submitApplication(token, applicationID){
	if (applicationID == 12345){
		var JSONvar = {status:true, ErrMsg:undefined, value:true};
	}
	else{
		var JSONvar = {status:false, ErrMsg:"Application does not exist", value:true};
	}
	return JSONvar;
}

// NOT USED FOR DEMO:
function addPotentialCI(token, applicationID, ciList){
	var JSONvar = {status:true, ErrMsg:undefined, value:true};
	return JSONvar;
}

