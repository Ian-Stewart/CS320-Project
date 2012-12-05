var DAL = require('./DAL');

//Vars for testIsUserValid
var vuser ="jjabrams";
var vpass ="testpw";
var ivpass="doesntmatter";
var ivuser = "rms";
var vuser_vpass={value:true,status:true,ErrMsg:undefined};
var vuser_ivpass={value:false,status:true,ErrMsg:undefined};
var ivuser_vpass={value:false,status:true,ErrMsg:undefined};
var ivuser_ivpass={value:false,status:true,ErrMsg:undefined};
var database_disconnected={value=undefined,status:false,ErrMsg:”Database Failure”};


function testIsUserValid(){
	console.log("Starting test for isUserValid");
	var testA = DAL.isUserValid(vuser,vpass);
	if(testA !== vuser_vpass){
		console.log("vuser,vpass fail!");
		return false;	
	}
	var testB = DAL.isUserValid(vuser,ivpass);
	if(testB !== vuser_ivpass){
		console.log("vuser ivpass fail!");
		return false;	
	}
	var testC = DAL.isUserValid(ivuser,vpass);
	if(testC !== ivuser_vpass){
		console.log("ivuser vpass fail!");
		return false;
	}
	var testD = DAL.isUserValid(ivuser,ivpass);
	if(testD !== ivuser_ivpass){
		console.log("ivuser ivpass fail!");
		return false;
	}
	console.log("testIsUserValid successful!");
	return true;
}

//Code to call tests
testIsUserValid();
console.log("Done with all tests! :3");
