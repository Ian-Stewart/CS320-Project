/*
Model team DAL test package.
Last edited 12-04-02012

This is the testing package for the model team DAL.
Vars for each test come before that particular test
Tests must be added to the testing method at the bottom of this file
*/

//Imports
var DAL = require('./DAL');//The data access layer library

//General purpose expected returns
//Not currently implemented
var database_disconnected={value=undefined,status:false,ErrMsg:”Database Failure”};//This is the general expected return when the database is inaccessible

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
	console.log("Starting test for isUserValid");
	var testA = DAL.isUserValid(vuser,vpass);//Test a valid login
	if(testA !== vuser_vpass){
		console.log("vuser,vpass fail!");
		return false;	
	}
	var testB = DAL.isUserValid(vuser,ivpass);//Test a valid username with an invalid password
	if(testB !== vuser_ivpass){
		console.log("vuser ivpass fail!");
		return false;	
	}
	var testC = DAL.isUserValid(ivuser,vpass);//Test an invalid user with someone else's password
	if(testC !== ivuser_vpass){
		console.log("ivuser vpass fail!");
		return false;
	}
	var testD = DAL.isUserValid(ivuser,ivpass);//Test an invalid user with an invalid password
	if(testD !== ivuser_ivpass){
		console.log("ivuser ivpass fail!");
		return false;
	}
	console.log("testIsUserValid successful!");
	return true;
}

//Vars for testEditFormA:
//This is a test valid form A (Currently, we only test part A1)
var valid_form{
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

var invalid_form1{//A blank form should be rejected
formID:23,
A1:{
	long_title:undefined
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

var invalid_form2{//This form has an invalid form A1 short title (over 50 characters) and should be rejected
formID:7,
A1:{	
	long_title:"In West Philadelphia born and raised, on the playground is where I spent most of my days, chillin' out maxin' relaxin' all cool and all, shootin' some b-ball outside of the school, when a couple of guys who were up to no good started makin' trouble in my neighborhood. I got in one little fight and my mom got scared and said you're movin' with your auntie and uncle in Bel-Air."
	short_title:"The Elder Scrolls told of their return. Their defeat was merely a delay 'til the time after Oblivion opened, when the sons of Skyrim would spill their own blood. But no one wanted to believe... Believe they even existed. And when the truth finally dawns... It dawns in fire! But there's one they fear. In their tongue, he is 'Dovahkiin': Dragonborn!"
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
		if(DAL.getFormA(valid_form[formID] !== valid_form){
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
	if(testB !== invalid_form){
		console.log("Invalid form submit fail");
		return false;	
	}
	console.log("Test passed!");
	return true;
}

//Vars for testGetFormA:
var database_form{//This form should be in the database
formID:1,
A1:{
	long_title:"TROGDOR! TROGDOR! Trogdor was a man! I mean, he was a dragon-man, or maybe he was just a dragon... But he was still TROGDOR! TROGDOR!"
	short_title:"The effects of gasoline on fire"
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
function runAllTests(){
	console.log("Testing isUserValid:" + testIsUserValid());
	console.log("Testing editFormA:" + testEditFormA());
	console.log("Testing getFormA:" + testGetFormA());
	console.log("Done with all tests!");.
}
