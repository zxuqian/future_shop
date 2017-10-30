var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');

/**
 * Gulp Tasks
 */

gulp.task('nodemon', function () {
    let started = false;
    nodemon({
        script: 'app.js',
        ignore: [
            'gulpfile.js',
            'node_modules/',
            'views'
        ]
    })
        .on('start', function () {
            setTimeout(function () { // Wait for sever to start up
                if(!started) {
                    browserSync.init({
                        proxy: "localhost:3000",  // local node app address
                        files: ["public/**/*.*"],
                        port: 3015  // use *different* port than above
                    });
                    started = true;
                }     
                browserSync.reload({ stream: false });
            }, 2000);
        });
});

gulp.task('default', ['nodemon'], function () {
    gulp.watch(['views/**/*.*'], browserSync.reload);
});
