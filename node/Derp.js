/*
Model team DAL test package.
Last edited 12-04-02012

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

var invalid_form = {value:undefined,status:false,ErrMsg:"Invalid form"};//Expected return when the form cannot be inserted into database
var valid_form = {value:true,status:true,ErrMsg:undefined};//Expected return when the form was successfully updated in the database
//Tests the editFormA function
function testEditFormA(){
	console.log("Starting test for editFormA");
	var testA = DAL.editFormA(valid_form);//Test submitting a valid form that the database should accept and verifies it was actually inserted into the database
	if(testA !== valid_form){
		console.log("Valid form submit fail");
		return false;
	}
	else{//Uses the getFormA method to verify the form was properly inserted. May fail if getFormA is not working properly, subsequent tests will reveal the correctness of getFormA.
		if(DAL.getFormA(valid_form[formID]) !== valid_form){
			console.log("Form in database was not stored or returned correctly");
			return false;
		}
	}
	var testB = DAL.editFormA(invalid_form1);//Test submitting a blank form
	if(testB !== invalid_form){
		console.log("Invalid form submit fail");
		return false;	
	}
	var testC = DAL.editFormA(invalid_form2);//Test submitting a form with an invalid field
	if(testC !== invalid_form){
		console.log("Invalid form submit fail");
		return false;	
	}
	console.log("Test passed!");
	return true;
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

//vars for testCreateApplication:
var valid_application1{//valid full board application
	long_title:"This long title is much shorter than the form long titles",
	short_title:"A more normal length title",
	full_board:true,
	applicationID:1
}//end valid_application1

var valid_application2{//valid expedited application
	long_title:"It is hard to come up with a good long name... maybe I will come up with one later",
	short_title:"Ishtcuwagln.mIwcuwol",
	full_board:false,
	applicationID:2
}//end valid_application2

var invalid_application1{//application with invalid ID (user with given ID does not have permissions)
	long_title:"Perhaps I should look up stories for my titles too",
	short_title:"That is quicker",
	full_board:true,
	applicationID:3
}//end valid_application3

var invalid_application2{//invalid long title (long title already exists in database)
	long_title:"Why did someone come up with this title before me",
	short_title:"At least this one is unique",
	full_board:true,
	applicationID:4
}//end valid_application4

var invalid_application3{//invalid short title (short title already exists in database)
	long_title:"Of course no one else would have taken this title already",
	short_title:"Shortly taken",
	full_board:true,
	applicationID:5
}

var valid_application_return = {value:true,status:true,ErrMsg:undefined};//Expected return when a valid application was successfully updated in the database
var invalid_application_return = {value:undefined,value:false,ErrMsg:undefined};//expected return of an invalid application

//test createApplication function
function testCreateApplication(){
	console.log("Starting test for createApplication");
	var testA = DAL.createApplication(valid_application1);//Test if application already exists
	if(testA !== valid_applicaton_return){
		console.log("Valid application creation failed");
		return false;
	}
	else{//Uses the getApplication method to verify the application was properly inserted. May fail if getApplication is not working properly, subsequent tests will reveal the correctness of getApplication.
		if(DAL.getApplication(valid_application1[applicationID] !== valid_application){
			console.log("Application in database was not stored or returned correctly");
			return false;
		}
	}
	var testB = DAL.createApplication(valid_application2);
	if(testB !== valid_application_return){
		console.log("Valid application creation failed");
		return false;
	}
	else{
		if(DAL.getApplication(valid_application2[applicationID] !== valid_application){
			console.log("Application in database was not stored or returned correctly");
			return false;
		}
	}
	var testC = DAL.createApplication(invalid_application1);
	if(testC !== invalid_application_return){
		console.log("Invalid application creation fail");
		return false;
	}
	var testD = DAL.createApplication(invalid_application2);
	if(testD !== invalid_application_return){
		console.log("Invalid application creation fail");
		return false;
	}
	var testE = DAL.createApplication(invalid_application3);
	if(testE !== invalid_application_return){
		console.log("Invalid application creation fail");
		return false;
	}
	console.log("Test passed!");
	return true;
}//end testCreateApplication

//vars for testGetApplication
var database_application{//This application should be in the database
	long_title:"A title that already exists in the database, what fun",
	short_title:"Succinct",
	full_board:true,
	applicationID:6
}//end database_application
var valid_application_return {value:database_application,status:true,ErrMsg:undefined};//Expected return when a valid application was successfully updated in the database
var invalid_application_return = {value:undefined,value:false,ErrMsg:undefined};//expected return of an invalid application
//test getApplication
function testGetApplication(){
	console.log("Starting test for getApplication");
	var testA = DAL.getApplication(database_application[applicationID]);//Test retrieval of application known to exist in database
	if(testA !== valid_application_return){
		console.log("Application was not retrieved correctly");
		return false;
	}
	var testB = DAL.getApplication(10);//Test retrieval of application not in database
	if(testA !== invalid_application_return){
		console.log("Error in retrieving application");
		return false;
	} 
	console.log("Test passed!");
	return true;
}

//Code to call tests
DAL.connectToDatabase(); //connect to the database

testIsUserValid();
//console.log("Testing editFormA:" + testEditFormA());
//console.log("Testing getFormA:" + testGetFormA());
//console.log("Testing createApplication:" + testCreateApplication());
//console.log("Testing updateApplication:" + testUpdateApplication());
//console.log("Testing getApplication:" + testGetApplication());
//console.log("Done with all tests!");.


//var printIt = function (obj) { console.log(obj); };
//DAL.isUserValid(vuser, vpass, printIt);
//DAL.isUserValid(vuser, ivpass, printIt);


