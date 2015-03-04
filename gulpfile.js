/* !!!! CONFIGURE !!!!
================================ */
var options = {};
options.user = 'yourusername';
options.port = 8888;
options.site_path = '/your/full/site/path'; // something like /Users/username/sites/mymampsite 

// Modules
var gulp = require('gulp');
var mamp = require('gulp-mamp');

gulp.task('config', function(cb){
	mamp(options, 'config', cb);
});

gulp.task('start', function(cb){
	mamp(options, 'start', cb);
});

gulp.task('stop', function(cb){
	mamp(options, 'stop', cb);
});

gulp.task('mamp', ['config', 'start']);
