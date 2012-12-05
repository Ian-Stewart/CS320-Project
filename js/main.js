
function btnLogout()
{
    window.location="login.html";
}

function loadDash()
{
    // No username stored from login, so return to login
    if (!localStorage.username) {
        window.location = "login.html";
    }
    $("#username").html(localStorage.username);
    
    if (!localStorage.roles) {
        localStorage.roles = "";
    }
    
    var roles = localStorage.roles.split(",");
    for(var i in roles) {
        alert(roles[i]);
    }
}
