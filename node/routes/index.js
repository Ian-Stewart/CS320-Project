/**
 * Created with JetBrains WebStorm.
 * User: Jim
 * Date: 12/2/12
 * Time: 12:39 AM
 * To change this template use File | Settings | File Templates.
 */
// a file for route handlers, Adapter Presentation logic, etc

var foo = {};

// A route handler for .... foo
exports.foo = function (req, res) {
    var n1;
    var n2;
    var that = this;

    // Process only if we have the proper args:
    if (req.body && res) {
        that.n1 = req.body
        that.n2 = res;
        foo.n1 = that.n1;
        foo.n2 = that.n2;
    }

        console.log('did a foo, but missed bar');
};

