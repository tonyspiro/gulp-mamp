'use strict';
var exec = require('child_process').exec;

it('should start MAMP', function (cb) {
	var command = 'npm install';
	exec(command, function(err) {
    if (err) return cb(err); // return error
    console.log('Installing');
    return cb();
  });
});