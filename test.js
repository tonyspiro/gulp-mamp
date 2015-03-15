'use strict';
var exec = require('child_process').exec;

it('should start MAMP', function (cb) {
	var command = '/Applications/MAMP/bin/start.sh';
	exec(command, function(err) {
    if (err) return cb(err); // return error
    console.log('Starting mamp server');
    return cb();
  });
});