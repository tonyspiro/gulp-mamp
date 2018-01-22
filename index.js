'use strict';

var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var fs = require('fs');

module.exports = function (options, task, cb) {
	var mamproot = "/Applications/MAMP/";
	var sedoverride = "";
	if (typeof options.mamproot !== 'undefined' && mamproot != options.mamproot){
		sedoverride = "%g' -e 's%" + mamproot + "%" + options.mamproot
		mamproot = options.mamproot;
		console.log("Overriding MAMP root with: " + mamproot);
	}

	function sudo(port) {
		var val = '';
		if(port === 80) {
			val = 'sudo ';
		}
		return val;
	}

	if(task == 'config'){
		var command = "sed -e 's%$user%" + options.user + "%g' -e 's%$path%" + options.site_path + "%g' -e 's%$port%" + options.port + sedoverride + "%g' node_modules/gulp-mamp/httpd.conf-template > " + mamproot + "conf/apache/httpd.conf";
		exec(command, function(err) {
			if (err) return cb(err); // return error
			console.log('Configuring mamp server to point to ' + options.site_path + ' at http://localhost:'+ options.port);
			return cb();
	  });
	}

	if(task == 'start') {
		var command = sudo(options.port) + mamproot + 'bin/start.sh'
		fs.access(mamproot + 'Library/logs/httpd.pid', fs.constants.F_OK, (err) => {
			if (err && err.code === 'ENOENT') {
				if(options.headless) {
					console.log('Starting mamp server at http://localhost:' + options.port);
					const detachedmamp = spawn(command, [], {
						detached: true,
						stdio: 'ignore'
					});
					detachedmamp.on('error', (err) => {
						console.log('ERROR:  Failed to start MAMP due to: ' + err);
					});
			} else {
				exec(command, function(err) {
			    if (err) return cb(err); // return error
			    console.log('Starting mamp server at http://localhost:' + options.port);
			    return cb();
			  });
			}
		} else {
			console.log('MAMP already running at http://localhost:' + options.port);
		}
	});

	}

	if(task == 'stop'){
		var command =  sudo(options.port) + mamproot + 'bin/stop.sh'
		exec(command, function(err) {
	    if (err) return cb(err); // return error
	    console.log('Stopping mamp server');
	    return cb();
	  });
	}
};
