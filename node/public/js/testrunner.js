(function( adapter ){

    var testCases = {
        
        alwaysFails: function(){
            return false;
        },
        alwaysPasses: function(){
            return true;
        },
        expectAdapterError: function(){
            var error = adapter.throwAdapterError();
            if(error.code == 500 && error.result=="error"){
                return true;
            } else {
                console.log("throwAdapterError failed. msg: " + error.msg);
                return false;
            }
        },
        getAdapterSuccess: function(){
            var success = adapter.getSuccess();
            if(success.code == 200 && success.result=="success"){
                return true;
            } else {
                console.log("getAdapterSuccess failed. Msg: " + success.msg);
                return false;
            }
        }

        /* Add test cases here. Should be in the format of

            testName: function(){
                var testStuffResult = testStuff();
                return testStuffResult
            }
        Note: Your function should always return either true or false. 
        */     
    }
    
    function getTestRunner(){
        var testHTML = $("#TESTTEMPLATE").html();
        var testContainer = $("#TESTCONTAINER");
        return function( test ){
          var newTest;
          var replaceDiv;
          var testResult = testCases[test]();
          if(testResult){
              replaceDiv = "bgred"
          } else {
              replaceDiv = "bggreen"
          }
        var newTest = testHTML.replace("%TESTTITLE%", test).replace(replaceDiv, "hidden");
        testContainer.append(newTest);
        }
    }
    var testRunner = getTestRunner();
    for(var test in testCases){
        testRunner(test);
    }
})( mockAdapter );
