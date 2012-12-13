/*
Model team DAL test package.
Last edited 12-13-02012

This is the testing package for the model team DAL.
Vars for each test come before that particular test
Tests must be added to the testing method at the bottom of this file
*/

//Imports
var DAL = require('./DAL');//The data access layer library
var async = require('async');
var _ = require('underscore');

//General purpose expected returns
//Not currently implemented
var database_disconnected={value:undefined,status:false,ErrMsg:"Database Failure"};//This is the general expected return when the database is inaccessible

//Vars for testIsUserValid:
var vuser = "jjabrams";	//Valid user, known to exist in validation database
var vpass = "testpw";	//This is a "valid password", is paired with the valid user in the validation database 
var ivuser = "skrillex";//Invalid user that is not in the validation database
var ivpass = "voyager";	//This password does not exist in the validation database at all

//Expected return values for each combination of valid and invalid users/passwords:
var vuser_vpass={value:true,status:true,ErrMsg:undefined};
var vuser_ivpass={value:false,status:true,ErrMsg:undefined};
var ivuser_vpass={value:false,status:true,ErrMsg:undefined};
var ivuser_ivpass={value:false,status:true,ErrMsg:undefined};


//Tests isUserValid function
function testIsUserValid(){
    
    async.waterfall([
    function(cb)
    {
	    console.log("Starting test for isUserValid"); //log starting message 
	    DAL.isUserValid(vuser,vpass, function (results)
        {
            if(!_.isEqual(results,vuser_vpass)) //print and be done
            {
	            console.log("vuser,vpass fail!");
	            console.log(results);	
            }
            else
            {
                cb(null);
            }
         });//Test a valid login
	},
	function(cb)
	{
	    DAL.isUserValid(vuser,ivpass, function (results)
	    {
	        if(!_.isEqual(results, vuser_ivpass))
	        {
		        console.log("vuser ivpass fail!");	
	        }
	        else
	        {
	            cb(null);
            }
	    });//Test a valid username with an invalid password
    },
    function(cb)
    {
	    DAL.isUserValid(ivuser,vpass, function (results)
	    {
	        if(!_.isEqual(results, ivuser_vpass))
	        {
		        console.log("ivuser vpass fail!");
	        }
	        else
	        {
	            cb(null);
            }
        });//Test an invalid user with someone else's password
	},
	function(results, cb)
	{
	    DAL.isUserValid(ivuser,ivpass, function(results)
	    {
	        if(!_.isEqual(results, ivuser_ivpass))
	        {
		        console.log("ivuser ivpass fail!");
	        }
	        else
	        {
	            console.log("testIsUserValid successful!");
            }
        });//Test an invalid user with an invalid password
    }]);
}

//Vars for testEditFormA:
//This is a test valid form A (Currently, we only test part A1)
var valid_form = {
formID:2,
A1:{//Currently this is the only subsection being tested, represents the "header" plus the Full board/expedited review
	//Dubstep lyrics inbound, prepare yourself
	long_title:"Aeg eh euf, gyaaaa uh ah uh, gye gye gye gyeeeeuw/Aeg eh euf, gyaaaa uh ah uh, gyuh nyi nyi nyi nyiiii nyao ni ni ni/Aeg eh euf, gyah, ah, yef, yaaiooiiiiinaaiiooneueuaodeh/Aeg eh euf, gyaaaa uh ah uh, gye naowenyeeehuh/Aeg eh euf, gyaaaa uh ah uh, gyuh nyi nao seddedum/Aeg eh euf, gyah, ah, yef, giaoaiosoiiiiinaaiiooneueuayewnudeh/Call 911!/Aeg eh euf, gyaaaa uh ah uh, gye naowenyeeehuh/Aeg eh euf, gyaaaa uh ah uh, gyuh nyi nao seddedum/Aeg eh euf, gyah, ah, yef, giaoaioseoiiiiinaaiio/Call 911 now!",//I don't really know what the longest possible title is, but I can't imagine they are longer than this
	short_title:"First of the year (Equinox)",//This must be less than or equal to 50 characters in length
	full_board:true
},
A2:undefined,//Not implemented yet
A3:undefined,
A4:undefined,
A5:undefined,
A6:undefined,
A7:undefined,
A8:undefined,
A9:undefined,
A10:undefined,
A11:undefined,
A12:undefined,
A13:undefined,
A14:undefined
};//End test_formA

var invalid_form1 = {//A blank form should be rejected
formID:23,
A1:{
	long_title:undefined,
	short_title:undefined,
	full_board:undefined
},
A2:undefined,
A3:undefined,
A4:undefined,
A5:undefined,
A6:undefined,
A7:undefined,
A8:undefined,
A9:undefined,
A10:undefined,
A11:undefined,
A12:undefined,
A13:undefined,
A14:undefined
}//End invalid_form1

var invalid_form2 = {//This form has an invalid form A1 short title (over 50 characters) and should be rejected
formID:7,
A1:{	
	long_title:"In West Philadelphia born and raised, on the playground is where I spent most of my days, chillin' out maxin' relaxin' all cool and all, shootin' some b-ball outside of the school, when a couple of guys who were up to no good started makin' trouble in my neighborhood. I got in one little fight and my mom got scared and said you're movin' with your auntie and uncle in Bel-Air.",
	short_title:"The Elder Scrolls told of their return. Their defeat was merely a delay 'til the time after Oblivion opened, when the sons of Skyrim would spill their own blood. But no one wanted to believe... Believe they even existed. And when the truth finally dawns... It dawns in fire! But there's one they fear. In their tongue, he is 'Dovahkiin': Dragonborn!",
	full_board:undefined
},
A2:undefined,
A3:undefined,
A4:undefined,
A5:undefined,
A6:undefined,
A7:undefined,
A8:undefined,
A9:undefined,
A10:undefined,
A11:undefined,
A12:undefined,
A13:undefined,
A14:undefined
}//End invalid_form2


var generic_app = {
	aid:123451,
	rid: 0,
	proposalTitle:"openApp",
	uid: 4,
	lastEditBy:"134214",
	editState: "open",
	submissionState:"defferedByCCI",
	approvalState: "null",
	username: "scolbert"
};

var app_Returned = {value:generic_app,status:true,ErrMsg:undefined};

function testRetrieveApplication()
{
exports.retrieveApplication = function(username,aid,callback)
	console.log("Starting test for Retrieve Application");
	var testA = DAL.retrieveApplication("scolbert",123451,function(results)
	{
		if(JSON.encode(result) === JSON.encode(app_Returned)
		{
			console.log("Valid application test passed. Expected " + app_Returned + ", got " + results);
		}
		else
		{
			console.log("Valid application test failed. Expected " + app_Returned + ", got " + results);
		}
	});//Does 101 need to be wrapped in quotation marks?
	var testB = DAL.retrieveApplication("USER","404",function(results)
	{
		if(results[0])
		{
			console.log("Invalid application retrieval test failed. Expected null, got " + results[0]);
		}
		else
		{
			console.log("Invalid application retrieval test passed. Expected null, got null");
		}
	});
}

var generic_forma = {
	aid:123451,
	rid:0,
	lastEditBy:4,
	proposalTitle:"openApp",
	shortTitle:"op"
};
 var formA_returned = {status: true, value: generic_forma, ErrMsg:undefined};
 var formA_invalid = {status: false, value: undefined, ErrMsg: "Database Error"};


function testRetrieveFormA()
{
	console.log("Starting test for Retrieve Form A");
	var testA = DAL.retrieveFormA("scolbert",123451,function(results)
	{
		if(JSON.encode(results) === JSON.encode(formA_returned))
		{
			console.log("Test for retrieve valid form A passed. Expected " + formA_returned + ", got " + results);
		}
		else
		{
			console.log("Test for retrieve valid form A failed. Expected " + formA_returned + ", got " + results);
		}
	});
	var testB = DAL.retrieveFormA("rms",209392,function(results)
	{
		if(results[0])
		{
			console.log("Invalid form a request test failed.");
		}
		else
		{
			console.log("Invalid form a request test passed.");
		}
		console.log("Expected " + formA_invalid + ", got " + results);
	});
}

var listOfPIApplications = {//List of jjabram's open applications
	0:{	
		aid:3,
		rid: 0,
		proposalTitle:"lockedApp",
		uid: 0,
		lastEditBy:0,
		editState: "locked",
		submissionState:"null",
		approvalState: "null",
		username: "jjabrams"
	},
	1:{
		aid:123451,
		rid: 0,
		proposalTitle:"openApp",
		uid: 0,
		lastEditBy:0,
		editState: "open",
		submissionState:"CCI",
		approvalState: "null",
		username: "jjabrams"
	},
};

var listOFPIA_valid = {status: true,value:listOfPIApplications,ErrMsg:undefined};
var listOFPIA_invalid = {status:true,value:{},ErrMsg:undefined};

function testRetrieveApplicationsForPI()
{
	console.log("Starting test for get list of PI applications");
	var testA = DAL.testRetrieveApplicationsForPI("jjabrams",function(results)
	{
		if(JSON.encode(results) === JSON.encode(listOFPIA_valid))
		{
			console.log("Test get list valid PI applications successful.");
		}
		else
		{
			console.log("Test get list valid PI applications unsuccessful.");
		}
	console.log("Expected " + listOFPIA_valid + ", got " + results);
	});
	var testB = DAL.testRetrieveApplicationsForPI("rms",function(results)
	{
		if(JSON.encode(results) === JSON.encode(listOFPIA_invalid))
		{
			console.log("Test get list valid PI applications successful.");
		}
		else
		{
			console.log("Test get list valid PI applications unsuccessful.");
		}
	console.log("Expected " + listOFPIA_invalid + ", got " + results);
	});
}

var listofCCA = {
	0:{
		aid:1,
		rid: 0,
		proposalTitle:"lockedApp",
		uid: 1,
		lastEditBy:1,
		editState: "locked",
		submissionState:"CCI",
		approvalState: "null",
		username: "boraily"
	}
};

var listOFCCI_valid = {status:true,value:listofCCA,ErrMsg:undefined};
//var listOFCCI_invalid = {status:true,value:{},ErrMsg:undefined};

function testRetrieveApplicationsForCCI()
{
	var testA = DAL.retrieveApplicationsForPI("jjabrams",function(results)
	{
		if(JSON.encode(results) === JSON.encode(listOFPCCI_valid))
		{
			console.log("Test get valid CCI applications successful.");
		}
		else
		{
			console.log("Test get valid CCI applications unsuccessful.");
		}
	console.log("Expected " + listOFCCI_valid + ", got " + results);
	});
//There is no invalid input for this function yet
//	var testB = DAL.retrieveApplicationsForPI("rms",function(results)
//	{
//		if(JSON.encode(results) === JSON.encode(listOFCCI_invalid))
//		{
//			console.log("Test get valid CCI applications successful.");
//		}
//		else
//		{
//			console.log("Test get valid CCI applications unsuccessful.");
//		}
//	console.log("Expected " + listOFCCI_invalid + ", got " + results);
//	});
}

var listofIRB = {
	0:{
		aid:2,
		rid: 0,
		proposalTitle:"frozenApp",
		uid: 2,
		lastEditBy:2,
		editState: "frozen",
		submissionState:"IRB",
		approvalState: "null",
		username: "jstewart"
	}
};

var listOFIRB_valid = {status:true,value:listofIRB,ErrMsg:undefined};
//var listOFIRB_invalid = {status:true,value:{},ErrMsg:undefined};

function testRetrieveApplicationsForIRB()
{
	console.log("Starting test for get list of IRB applications");
	var testA = DAL.retrieveApplicationsForIRB("jstewart",function(results)
	{
		if(JSON.encode(results) === JSON.encode(listOFIRB_valid))
		{
			console.log("Test get valid IRB applications successful.");
		}
		else
		{
			console.log("Test get valid IRB applications unsuccessful.");
		}
	console.log("Expected " + listOFIRB_valid + ", got " + results);
	});
	//There is no invalid input for this function yet
	//var testB = DAL.retrieveApplicationsForIRB("rms",function(results)
	//{
	//	if(JSON.encode(results) === JSON.encode(listOFIRB_invalid))
	//	{
	//		console.log("Test get invalid IRB applications successful.");
	//	}
	//	else
	//	{
	//		console.log("Test get invalid IRB applications unsuccessful.");
	//	}
	//console.log("Expected " + listOFIRB_invalid + ", got " + results);
	//});
}

var listofArchived = {
	0:{
		aid:0,
		rid: 0,
		proposalTitle:"archivedApp",
		uid: 134214,
		lastEditBy:134214,
		editState: "archived",
		submissionState:"null",
		approvalState: "approved",
		username: "glubas"
	}
};

var listOFArchived_valid = {status:true,value:listofArchived,ErrMsg:undefined};
var listOFArchived_invalid = {status:true,value:{},ErrMsg:undefined};

function testRetrieveArchivedApplicationsForUser()
{
	console.log("Starting test for get list of archived applications");
	var testA = DAL.retrieveArchivedApplicationsForUser("glubas",function(results)
	{
		if(JSON.encode(results) === JSON.encode(listOFArchived_valid))
		{
			console.log("Test get valid IRB applications successful.");
		}
		else
		{
			console.log("Test get valid IRB applications unsuccessful.");
		}
	console.log("Expected " + listOFIRB_valid + ", got " + results);
	});
	var testB = DAL.retrieveArchivedApplicationsForUser("rms",function(results)
	{
		if(JSON.encode(results) === JSON.encode(listOFArchived_invalid))
		{
			console.log("Test get valid IRB applications successful.");
		}
		else
		{
			console.log("Test get valid IRB applications unsuccessful.");
		}
	console.log("Expected " + listOFArchived_invalid + ", got " + results);
	});
}

function testSaveFormA()
{
    console.log("Start Test for SaveFormA");
    var form = {//This form should be in the database
    aid:123452,
    rid:1,
    lastEditBy:0,
    proposalTitle:"It Changed!",
    shortTitle:"WOW!"
    };//End database_form
    
    var name = "jjabrams";
    
    function printIt(it) { console.log(it.value, it.ErrMsg); };
    
    console.log("Above Test for SaveFormA");
    
    DAL.saveForm(name, form, printIt);
    
    console.log("End Test for SaveFormA");
}

//Vars for testGetFormA:
var database_form = {//This form should be in the database
formID:1,
A1:{
	long_title:"TROGDOR! TROGDOR! Trogdor was a man! I mean, he was a dragon-man, or maybe he was just a dragon... But he was still TROGDOR! TROGDOR!",
	short_title:"The effects of gasoline on fire",
	full_board:false
},
A2:undefined,
A3:undefined,
A4:undefined,
A5:undefined,
A6:undefined,
A7:undefined,
A8:undefined,
A9:undefined,
A10:undefined,
A11:undefined,
A12:undefined,
A13:undefined,
A14:undefined
}//End database_form

var invalid_form_return = {status:true,value:false,ErrMsg:undefined};//Expected return object when a form ID is not in the database
var valid_form_return = {status:true,value:database_form,ErrMsg:undefined};
//Tests the getFormA function
function testGetFormA(){
	console.log("Starting test for getFormA");
	var testA = DAL.getFormA(database_form[formID]);//Test retrieval of form known to exist in database
	if(testA !== database_form){
		console.log("Form was not retrieved correctly");
		return false;
	}
	var testB = DAL.getFormA(2012);//Test retrieval of form not in database, I seriously hope you guys don't do this
	if(testA !== invalid_form_request){
		console.log("Invalid request not processed properly");
		return false;
	} 
	console.log("Test passed!");
	return true;
}

//Code to call tests
DAL.connectToDatabase(); //connect to the database

//DAL.testa(123451);//I don't really know what this is supposed to be...

//testIsUserValid();
//testEditFormA();
//testRetrieveApplication();
//testRetrieveFormA();
//testRetrieveApplicationsForPI();
//testRetrieveApplicationsForCCI();
//testRetrieveApplicationsForIRB();
//testRetrieveArchivedApplicationsForUser();
testSaveFormA();

//console.log("Testing editFormA:" + testEditFormA());
//console.log("Testing getFormA:" + testGetFormA());
//console.log("Done with all tests!");.

var printIt = function (obj) { console.log(obj); };

var usersEntry = { uid: 123999, first_name: 'test2', last_name: 'user', email: "123@abc.net", telephone: "11231231234", pager_number: "1231231234", fax: "11231231234" };





