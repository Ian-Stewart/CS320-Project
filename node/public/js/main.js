
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
    var dashContent = "";
    for(var i in roles) {
        if (dashboards[roles[i]]) {
            dashContent += dashboards[roles[i]];
            if (i < roles.length - 1) {
                dashContent += '<br><br><div class="grid_12 vspacing"><hr></div>';
            }
        }
    }
    $("#dashContent").html(dashContent);
}

var dashboards = {
"irb":
    '<div class="grid_12">\
                <center><h2>IRB Dashboard</h2></center>\
            </div>\
<div class="grid_12">\
                <h2>Applications Requiring Review</h2>\
            </div>\
            <div class="grid_12 vspacing">\
                <div class="grid_4 border rounded"> \
                    <h3>Sample Application</h3>\
                </div>\
                <div class="grid_2 border rounded bggray">\
                    <h4 class="textCenter fw pxshadow lightText"> Pending </h4> \
                </div>\
\
                <div class="grid_3 border rounded bglightGray">\
                    <h4 class="textCenter fw pxShadow"><a href="application.html">View / Edit</a></h4> \
                </div>\
            </div>\
            <div class="grid_12 vspacing">\
                <div class="grid_4 border rounded"> \
                    <h3>Another Sample Application</h3> \
                </div>\
                <div class="grid_2 border rounded bggreen">\
                    <h4 class="textCenter fw pxshadow"> Complete </h4> \
                </div>\
\
                <div class="grid_3 border rounded bglightGray">\
                    <h4 class="textCenter fw pxShadow"><a href="application.html">View / Edit</a></h4> \
                </div>\
            </div>\
            <div class="grid_12 vspacing">\
                <div class="grid_4 border rounded"> \
                    <h3>Some Other Sample Application</h3> \
                </div>\
                <div class="grid_2 border rounded bggray">\
                    <h4 class="textCenter fw pxshadow lightText"> Pending </h4> \
                </div>\
\
                <div class="grid_3 border rounded bglightGray">\
                    <h4 class="textCenter fw pxShadow"><a href="application.html">View / Edit</a></h4> \
                </div>\
            </div>\
            <div class="grid_12 vspacing">\
                <h2><a href="#">Approved/Disapproved Application Archives</a></h2>\
            </div>',
"pi":
    '<div class="grid_12">\
                <center><h2>Primary Investigator Dashboard</h2></center>\
            </div>\
            <div class="grid_12 vspacing">\
                <h2>Pending Applications</h2>\
            </div>\
            <div class="grid_12 vspacing">\
                <div class="grid_4 border rounded"> \
                    <h3>Sample Application</h3>\
                </div>\
                <div class="grid_2 border rounded bggray">\
                    <h4 class="textCenter fw pxshadow lightText"> Pending </h4> \
                </div>\
\
                <div class="grid_3 border rounded bglightGray">\
                    <h4 class="textCenter fw pxShadow"><a href="application.html">View / Edit</a></h4> \
                </div>\
            </div>\
            <div class="grid_12 vspacing">\
                <div class="grid_4 border rounded"> \
                    <h3>Some Different Sample Application</h3> \
                </div>\
\
                <div class="grid_2 border rounded bggray">\
                    <h4 class="textCenter fw pxshadow lightText"> Pending </h4> \
                </div>\
\
                <div class="grid_3 border rounded bglightGray">\
                    <h4 class="textCenter fw pxShadow"><a href="application.html">View / Edit</a></h4> \
                </div>\
            </div>\
            <div class="grid_12 vspacing">\
                <h2>Completed Applications</h2>\
            </div>\
            <div class="grid_12 vspacing">\
                <div class="grid_4 border rounded"> \
                    <h3>Another Sample Application</h3> \
                </div>\
                <div class="grid_2 border rounded bggreen">\
                    <h4 class="textCenter fw pxshadow"> Complete </h4> \
                </div>\
\
                <div class="grid_3 border rounded bglightGray">\
                    <h4 class="textCenter fw pxShadow"><a href="#" onclick="btnDelete();">View / Edit </a></h4>\
                </div>\
            </div>\
            <div class="grid_12 vspacing">\
                <h2>Applications Under Review</h2>\
            </div>\
            <div class="grid_12 vspacing">\
                <div class="grid_4 border rounded"> \
                    <h3>Some Other Sample Application</h3> \
                </div>\
                <div class="grid_2 border rounded bggray">\
                    <h4 class="textCenter fw pxshadow lightText"> Pending </h4> \
                </div>\
\
                <div class="grid_3 border rounded bglightGray">\
                    <h4 class="textCenter fw pxShadow"><a href="application.html">View / Edit</a></h4> \
                </div>\
            </div>\
            <div class="grid_12 vspacing">\
                <h2><a href="#">Approved/Disapproved Application Archives</a></h2>\
            </div>',
"cci":
    '<div class="grid_12">\
                <center><h2>CCI Dashboard</h2></center>\
            </div>\
            <div class="grid_12 vspacing">\
                <h2>Applications Requiring Review</h2>\
            </div>\
            <div class="grid_12 vspacing">\
                <div class="grid_4 border rounded"> \
                    <h3>Sample Application</h3>\
                </div>\
                <div class="grid_2 border rounded bggray">\
                    <h4 class="textCenter fw pxshadow lightText"> Pending </h4> \
                </div>\
\
                <div class="grid_3 border rounded bglightGray">\
                    <h4 class="textCenter fw pxShadow"><a href="application.html">View / Edit</a></h4> \
                </div>\
            </div>\
            <div class="grid_12 vspacing">\
                <div class="grid_4 border rounded"> \
                    <h3>Some Different Sample Application</h3> \
                </div>\
                <div class="grid_2 border rounded bggreen">\
                    <h4 class="textCenter fw pxshadow"> Complete </h4> \
                </div>\
\
                <div class="grid_3 border rounded bglightGray">\
                    <h4 class="textCenter fw pxShadow"><a href="application.html">View / Edit</a></h4> \
                </div>\
            </div>\
            <div class="grid_12 vspacing">\
                <h2>Deferred Applications</h2>\
            </div>\
            <div class="grid_12 vspacing">\
                <div class="grid_4 border rounded"> \
                    <h3>Another Sample Application</h3> \
                </div>\
                <div class="grid_2 border rounded bggray">\
                    <h4 class="textCenter fw pxshadow lightText"> Pending </h4> \
                </div>\
\
                <div class="grid_3 border rounded bglightGray">\
                    <h4 class="textCenter fw pxShadow"><a href="application.html">View / Edit</a></h4> \
                </div>\
            </div>\
            <div class="grid_12 vspacing">\
                <h2>Applications Under IRB Review</h2>\
            </div>\
            <div class="grid_12 vspacing">\
                <div class="grid_4 border rounded"> \
                    <h3>Some Other Sample Application</h3> \
                </div>\
                <div class="grid_2 border rounded bggray">\
                    <h4 class="textCenter fw pxshadow lightText"> Pending </h4> \
                </div>\
\
                <div class="grid_3 border rounded bglightGray">\
                    <h4 class="textCenter fw pxShadow"><a href="application.html">View / Edit</a></h4> \
                </div>\
            </div>\
            <div class="grid_12 vspacing">\
                <h2><a href="#">Approved/Disapproved Application Archives</a></h2>\
            </div>',
"chair":
    '<div class="grid_12">\
                <center><h2>Chair Dashboard</h2></center>\
            </div>\
            <div class="grid_12">\
                <h2>Applications Requiring Delegation</h2>\
            </div>\
            <div class="grid_12 vspacing">\
                <div class="grid_4 border rounded"> \
                    <h3>Sample Application</h3>\
                </div>\
                <div class="grid_2 border rounded bggray">\
                    <h4 class="textCenter fw pxshadow lightText"> Pending </h4> \
                </div>\
\
                <div class="grid_3 border rounded bglightGray">\
                    <h4 class="textCenter fw pxShadow"><a href="application.html">View</a></h4> \
                </div>\
            </div>\
            <div class="grid_12 vspacing">\
                <div class="grid_4 border rounded"> \
                    <h3>Another Sample Application</h3> \
                </div>\
                <div class="grid_2 border rounded bggreen">\
                    <h4 class="textCenter fw pxshadow"> Complete </h4> \
                </div>\
\
                <div class="grid_3 border rounded bglightGray">\
                    <h4 class="textCenter fw pxShadow"><a href="application.html">View</a></h4> \
                </div>\
            </div>\
            <div class="grid_12 vspacing">\
                <div class="grid_4 border rounded"> \
                    <h3>Some Other Sample Application</h3> \
                </div>\
                <div class="grid_2 border rounded bggray">\
                    <h4 class="textCenter fw pxshadow lightText"> Pending </h4> \
                </div>\
\
                <div class="grid_3 border rounded bglightGray">\
                    <h4 class="textCenter fw pxShadow"><a href="application.html">View</a></h4> \
                </div>\
            </div>\
            <div class="grid_12 vspacing">\
                <h2><a href="#">Approved/Disapproved Application Archives</a></h2>\
            </div>',
"department":
    '<div class="grid_12">\
                <center><h2>Department Dashboard</h2></center>\
            </div>\
            <div class="grid_12">\
                <h2>Applications Requiring Delegation</h2>\
            </div>\
            <div class="grid_12 vspacing">\
                <div class="grid_4 border rounded"> \
                    <h3>Sample Application</h3>\
                </div>\
                <div class="grid_2 border rounded bggray">\
                    <h4 class="textCenter fw pxshadow lightText"> Pending </h4> \
                </div>\
\
                <div class="grid_3 border rounded bglightGray">\
                    <h4 class="textCenter fw pxShadow"><a href="application.html">View / Edit</a></h4> \
                </div>\
            </div>\
            <div class="grid_12 vspacing">\
                <div class="grid_4 border rounded"> \
                    <h3>Another Sample Application</h3> \
                </div>\
                <div class="grid_2 border rounded bggreen">\
                    <h4 class="textCenter fw pxshadow"> Complete </h4> \
                </div>\
\
                <div class="grid_3 border rounded bglightGray">\
                    <h4 class="textCenter fw pxShadow"><a href="application.html">View / Edit</a></h4> \
                </div>\
            </div>\
            <div class="grid_12 vspacing">\
                <div class="grid_4 border rounded"> \
                    <h3>Some Other Sample Application</h3> \
                </div>\
                <div class="grid_2 border rounded bggray">\
                    <h4 class="textCenter fw pxshadow lightText"> Pending </h4> \
                </div>\
\
                <div class="grid_3 border rounded bglightGray">\
                    <h4 class="textCenter fw pxShadow"><a href="application.html">View / Edit</a></h4> \
                </div>\
            </div>\
            <div class="grid_12 vspacing">\
                <h2><a href="#">Approved/Disapproved Application Archives</a></h2>\
            </div>'};
