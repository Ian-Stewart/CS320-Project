
function btnLogout()
{
    window.location="login.html";
}

function btnDelete()
		{
			alert("This Application is locked. You are not allowed to Edit it");
		}

function loadDash()
{
    // No username stored from login, so return to login
    if (!localStorage.username) {
        window.location = "login.html";
    }
    $("#username").html(localStorage.username);
    
    // Avoid trying to split an undefined variable
    if (!localStorage.roles) {
        localStorage.roles = "";
    }
    // temporary testing...
    //localStorage.roles = "irb,irb";
    var roles = localStorage.roles.split(",");
    
    var templateHTML = $("#appTemplate").html();
    
   // getData("/getAllUsers");
   // getData("/getAppApps");
   // getData("/createApplication", localStorage.username, "Test", onSuccess);
    getData("/getPIApplications", localStorage.username, undefined, onSuccess);
    
}
    var onSuccess = function(data){
        onError();
    }

    var onError = function(){
       var applications = [{"aid":3,"rid":0,"proposalTitle":"lockedApp2","uid":0,"lastEditBy":"0","editState":"locked","submissionState":"defferedByIRB","approvalState":"null","username":"jjabrams"},{"aid":123452,"rid":0,"proposalTitle":"openApp2","uid":0,"lastEditBy":"0","editState":"open","submissionState":"null","approvalState":"null","username":"jjabrams"},{"aid":1,"rid":0,"proposalTitle":"lockedApp","uid":1,"lastEditBy":"1","editState":"locked","submissionState":"CCI","approvalState":"null","username":"boraily"},{"aid":123458,"rid":0,"proposalTitle":"Test","uid":null,"lastEditBy":null,"editState":null,"submissionState":null,"approvalState":null,"username":null},{"aid":2,"rid":0,"proposalTitle":"frozenApp","uid":2,"lastEditBy":"2","editState":"frozen","submissionState":"IRB","approvalState":"null","username":"jstewart"},{"aid":123451,"rid":0,"proposalTitle":"openApp","uid":4,"lastEditBy":"4","editState":"open","submissionState":"defferedByCCI","approvalState":"null","username":"scolbert"},{"aid":0,"rid":0,"proposalTitle":"archivedApp","uid":134214,"lastEditBy":"134214","editState":"archived","submissionState":"null","approvalState":"approved","username":"glubas"}];
       
       var templateHTML = $("#appTemplate").html();
       for(var app in applications){
           var app = applications[app];
           var appHTML = templateHTML.replace("%APPNAME%", app["proposalTitle"]);
           appHTML = appHTML.replace("%APPID%", app["aid"]);
           $("#dashContent").append(appHTML);
           }

           localStorage.applications = JSON.stringify(applications);
    }

    function setID(appid){
        localStorage.appid = appid;
    }


function getData(endpoint, username, data, success){

    var urlString = endpoint; 
    if(username != undefined){
        urlString += "/" + username;
    }
    if(data != undefined){
        urlString += "/" + data;
    }
    $.ajax({
    type: 'get',
    url: urlString,
    contenttype: "application/json",
    dataType: "json",
    success: function(data) {
        console.log(endpoint + " : " + JSON.stringify(data));
        if(success != undefined){
            success(data); 
        }
    }, error: onError
    });
}

onError();
