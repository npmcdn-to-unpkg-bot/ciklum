const SRCS_APP_PATH='app';
const SRCS_APP_FILE=SRCS_APP_PATH + '/**/*.ts';
const SRCS_HTM_FILE=SRCS_APP_PATH + '/**/*.html';

const DIST_APP_PATH='resources/application';
const DIST_APP_FILE=DIST_APP_PATH + '/*.js';

const DIST_TMP_PATH='resources/tmp';
const DIST_TMP_FILE=DIST_TMP_PATH + '/*.js';

const gulp = require('gulp');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
//const sourcemaps = require('gulp-sourcemaps');

// clean the contents of the distribution directory
gulp.task('clean', function () {
  	return gulp.src([DIST_APP_PATH, DIST_TMP_PATH], {read: false}).pipe(clean());
});

// TypeScript compile
gulp.task('compile', ['clean'], function () {
  	return gulp
    	.src([SRCS_APP_FILE])
    	.pipe(typescript(tscConfig.compilerOptions))
    	.pipe(gulp.dest(DIST_TMP_PATH));
});

gulp.task('resources', function () {
    return gulp.src(SRCS_HTM_FILE)
   .pipe(gulp.dest(DIST_APP_PATH));
});

gulp.task('babel', ['compile'], function () {
    gulp.src([DIST_TMP_FILE])
        .pipe(babel())
        .pipe(gulp.dest(DIST_APP_PATH));
});

gulp.task('watch', ['babel'], function () {
    gulp.watch([DIST_APP_FILE], ['babel']);
});

gulp.task('build', ['babel','resources']);
gulp.task('default', ['build']);
