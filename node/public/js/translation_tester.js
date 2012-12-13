    saveForm("jfrancis", 12345); //12345 is the only formID that is stored
    saveForm("efrancis", 54321); //any form ID not 12345 works

     acceptApplication("jfrancis", 12345, 12345); //12345 is the successful application
     acceptApplication("efrancis", 54321, 54321); //not the only successful application    

     rejectApplication("jfrancis", 12345, "accepted");
    rejectApplication("efrancis", 54321, "rejected");

     submitApplication("jfrancis", 12345);
     submitApplication("efrancis", 54321);

    getApplicationForms("jfrancis", 12345); //12345 is the only working appID
    getApplicationForms("efrancis", 54321); //not appID 12345 so it will return with an error


    function callAjax(stuff0, stuff1, stuff2, stuff3, stuff4){
        $.ajax({
            type: 'get',
            url: stuff0,
            contenttype: "application/json",
            data: {'token': stuff1,
            'applicationID': stuff4,
            'formID': stuff2, 
            'newStatus': stuff3},
            dataType: "json",
            success: function(data) {
                console.log(stuff0 + " : " + JSON.stringify(data));
            }
        });
    }

    function saveForm(id, code){
        callAjax("/saveForm",id,code);
    }

    function acceptApplication(id,code,code2){
        callAjax("/acceptApplication",id,code,undefined,code2);
    }

    function rejectApplication(id, code, string){
        callAjax("/rejectApplication",id, code, string);
    }
    function submitApplication(id, code){
        callAjax("/submitApplication",id, code);
    }
    function getApplicationForms(id, code){
        callAjax("/getApplicationForms",id, undefined, undefined, code);
    }
