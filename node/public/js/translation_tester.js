    console.log("saveForm Success: " + saveForm("jfrancis", 12345)); //12345 is the only formID that is stored
    console.log("saveForm Error: " + saveForm("efrancis", 54321)); //any form ID not 12345 works

    console.log("acceptApplication Success: " + acceptApplication("jfrancis", 12345, 12345)); //12345 is the successful application
    console.log("acceptApplication Error: " + acceptApplication("efrancis", 54321, 54321)); //not the only successful application    

    console.log("rejectApplication Success: " + rejectApplication("jfrancis", 12345, "accepted"));
    console.log("rejectApplication Error: " + rejectApplication("efrancis", 54321, "rejected"));

    console.log("submitApplication Success: " + submitApplication("jfrancis", 12345));
    console.log("submitApplication Error: " + submitApplication("efrancis", 54321));

    console.log("getApplicationForms Success: " + getApplicationForms("jfrancis", 12345)); //12345 is the only working appID
    console.log("getApplicationForms Error: " + getApplicationForms("efrancis", 54321)); //not appID 12345 so it will return with an error
