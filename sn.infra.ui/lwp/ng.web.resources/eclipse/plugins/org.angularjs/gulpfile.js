/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

var gulp = require('gulp')
var rename = require('gulp-rename')
var utils = require('./utils')

var NG_PATH = './resources/angular/',
   NG_MOCKS_PATH = './resources/angular-mocks/',
   NG_ROUTE_PATH = './resources/angular-route/',
   NG_SOURCE = 'angular.js',
   NG_MOCKS_SOURCE = 'angular-mocks.js',
   NG_ROUTE_SOURCE = 'angular-route.js',
   SAFE_SUFFIX = '.safe';

gulp.task('rewrite-angular', function () {
    return gulp.src(NG_PATH + NG_SOURCE)
       .pipe(utils())
       .pipe(rename({suffix: SAFE_SUFFIX}))
       .pipe(gulp.dest(NG_PATH))
})

gulp.task('rewrite-angular-route', function () {
    return gulp.src(NG_ROUTE_PATH + NG_ROUTE_SOURCE)
       .pipe(utils())
       .pipe(rename({suffix: SAFE_SUFFIX}))
       .pipe(gulp.dest(NG_ROUTE_PATH))
})

gulp.task('rewrite-angular-mocks', function () {
    return gulp.src(NG_MOCKS_PATH + NG_MOCKS_SOURCE)
       .pipe(utils())
       .pipe(rename({suffix: SAFE_SUFFIX}))
       .pipe(gulp.dest(NG_MOCKS_PATH))
})

gulp.task('remove-es-reserved-future-use', ['rewrite-angular', 'rewrite-angular-route', 'rewrite-angular-mocks'])

gulp.task('default', ['remove-es-reserved-future-use'])