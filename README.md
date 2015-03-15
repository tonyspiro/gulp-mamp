# Gulp MAMP
[![Build Status](https://travis-ci.org/tonyspiro/gulp-mamp.svg?branch=master)](https://travis-ci.org/tonyspiro/gulp-mamp)

> Gulp MAMP allows you to configure, start and stop your MAMP server from the terminal.

```shell
npm install gulp-mamp
```

## The "mamp" task

### The Goods
Configure your site_path and port and you are good to go.  Your gulpfile.js should look like this:

```js
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
```

### Getting Started (and Stopped!)
Once you have your gulpfile.js file configged, you can run the following commands to config, start and stop MAMP.
```
gulp mamp
gulp stop
```
