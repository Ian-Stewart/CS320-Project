(function(){

    var testCases = {
        
        alwaysFalse: function(){
            return false;
        },
        alwaysTrue: function(){
            return true;
        },

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
})();
