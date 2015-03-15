'use strict';

var exec = require('child_process').exec;

module.exports = function (options, task, cb) {

	function sudo(port) {
		var val = '';
		if(port === 80) {
			val = 'sudo ';
		}
		return val;
	}

	if(task == 'config'){
		var command = "sed -e 's%$user%" + options.user + "%g' -e 's%$path%" + options.site_path + "%g' -e 's%$port%" + options.port + "%g' node_modules/gulp-mamp/httpd.conf-template > /Applications/MAMP/conf/apache/httpd.conf";
		exec(command, function(err) {
			if (err) return cb(err); // return error
			console.log('Configuring mamp server to point to ' + options.site_path + ' at http://localhost:'+ options.port);
			return cb();
	  });
	}

	if(task == 'start'){
		var command = sudo(options.port) + '/Applications/MAMP/bin/start.sh'
		exec(command, function(err) {
	    if (err) return cb(err); // return error
	    console.log('Starting mamp server at http://localhost:' + options.port);
	    return cb();
	  });
	}

	if(task == 'stop'){
		var command =  sudo(options.port) + '/Applications/MAMP/bin/stop.sh'
		exec(command, function(err) {
	    if (err) return cb(err); // return error
	    console.log('Stopping mamp server');
	    return cb();
	  });
	}
};
