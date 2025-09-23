/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

var gulp = require('gulp');
var os = require('os');
var fs = require('fs');
var path = require('path')
var sass = require('gulp-sass');
var flip = require('css-flip');
var rework = require('gulp-rework');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var merge = require('merge-stream');
var eol = require('gulp-eol');
var replace = require('gulp-replace');
var minifyCSS = require('gulp-minify-css');

var SOURCE_PATH = './sass', BUILD_PATH = './resources/css';

function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
}

gulp.task('sass', function () {
    return gulp.src(SOURCE_PATH + '/*.scss')
        .pipe(plumber())
        .pipe(sass({errLogToConsole: true}))
        .pipe(eol(os.EOL, false))
        .pipe(minifyCSS({debug:true}))
        .pipe(gulp.dest(BUILD_PATH + '/defaultTheme/'));
});
gulp.task('generateColorVariations', function () {
    var colorsFolder = getFolders(SOURCE_PATH + '/colorTheme/');
    console.log(colorsFolder);
    var tasks = colorsFolder.map(
        function(folderName) {
            //generate new theme($Color).css, this needs to be added to plugin.xml
            //after the first time the variation is generate this is optional, TODO move it to separate task
            var generateTheme = gulp.src(['./resources/theme.css','./resources/themeRTL.css'])
                .pipe(replace('defaultTheme\/', folderName + '\/'))
                .pipe(rename(function (path) {
                    var re = /\w+RTL/;
                    if(re.test(path.basename))
                        path.basename = folderName + 'RTL';
                    else path.basename = folderName;
                  }))
                .pipe(gulp.dest('resources'));   
            //copy scss to folder where _colors.scss variation is, we can't replace _colors.scss live in the file stream
            var copyVariation = gulp.src([SOURCE_PATH + '/applications/*.scss', SOURCE_PATH + '/defaultTheme.scss'], {base: 'sass'})
                .pipe(gulp.dest(SOURCE_PATH + '/colorTheme/'+ folderName));
            //wait for both the task
            return merge(copyVariation, generateTheme)
    });
    //wait for all the color variation
    return merge(tasks);
});
gulp.task('sassColorVariations', ['generateColorVariations'], function () {
    return gulp.src(SOURCE_PATH + '/colorTheme/**/*.scss')
        .pipe(sass({errLogToConsole: true}))
        .pipe(gulp.dest(BUILD_PATH))
        .pipe(rename({suffix: "RTL"}))
        .pipe(rework(flip.rework()))
        .pipe(gulp.dest(BUILD_PATH));
});


gulp.task('applications', function() {
    return gulp.src(SOURCE_PATH + '/applications/*.scss')
        .pipe(plumber())
        .pipe(sass({errLogToConsole: true}))
        .pipe(eol(os.EOL, false))
        .pipe(minifyCSS({debug:true}))
        .pipe(gulp.dest(BUILD_PATH + '/base/applications/'))
});


gulp.task('flipApplications', function() {
   return gulp.src(SOURCE_PATH + '/applications/*.scss')
       .pipe(plumber())
       .pipe(sass({errLogToConsole: true}))
       .pipe(rename({suffix: "RTL"}))
       .pipe(rework(flip.rework()))
       .pipe(replace('*\/\n\n','*\/\n'))
       .pipe(eol(os.EOL, false))
       .pipe(minifyCSS({debug:true}))
       .pipe(gulp.dest(BUILD_PATH + '/base/applications/'));
});

gulp.task('flipTheme', function() {
   return gulp.src(SOURCE_PATH + '/*.scss')
        .pipe(sass({errLogToConsole: true}))
        .pipe(rename({suffix: "RTL"}))
        .pipe(rework(flip.rework()))
        .pipe(replace('*\/\n\n','*\/\n'))
        .pipe(eol(os.EOL, false))
        .pipe(minifyCSS({debug:true}))
        .pipe(gulp.dest(BUILD_PATH + '/defaultTheme/'));   
});

gulp.task('watch', function() {
    return gulp.watch(SOURCE_PATH + '/**/*.scss', ['default'])
});

gulp.task('default', ['sass','applications','flipTheme','flipApplications']);
gulp.task('keepwatching',  ['sass','applications','flipTheme', 'flipApplications', 'watch']);