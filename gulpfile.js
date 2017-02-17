var gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    istanbul = require('gulp-istanbul'),

    mocha = require('gulp-mocha');

gulp.task('pre-coverage', function () {
    return gulp.src([ 'src/**/*.js' ])
        // Covering files
        .pipe(istanbul({
             includeUntested: true
        }))
        // Force `require` to return covered files
        .pipe(istanbul.hookRequire());
});

gulp.task('coverage', [ 'pre-coverage' ], function () {
    return gulp.src([ 'tests/unit/**/*.js' ])
        .pipe(mocha())
        // Creating the reports after tests ran
        .pipe(istanbul.writeReports())
        // Enforce a coverage of at least 90%
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 75 } }));
});

gulp.task('lint', function () {
    return gulp.src([ 'scripts/**/*.js'])
        // eslint() attaches the lint output to the eslint property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

gulp.task('default', [ 'lint', 'coverage' ]);
