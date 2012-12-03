var mockAdapter = (function (){ 
    var mockAdapter = {
    
        throwAdapterError: function(){
            return { result: "error", code: 500, msg: "Forced Adapter Error" };
        },

        getSuccess: function(){
            return { result: "success", code: 200, msg: null };
        }
    }

    return mockAdapter;
})();
