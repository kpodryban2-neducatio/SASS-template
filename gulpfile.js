const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync') ;
const gutil = require('gulp-util');
const notify = require("gulp-notify");
const r = require('tiny-lr')
const refresh = require('gulp-livereload')
const nodemon = require('gulp-nodemon')
// const server = lr();
const wait = require('gulp-wait');

function showError(err) {
    notify.onError({
        title: "Gulp error in " + err.plugin,
        message:  err.message
    })(err);

    console.log(gutil.colors.red(err.toString()));
    this.emit('end');
}

gulp.task('browser-sync', function() {
    browserSync.init({
        server: "./", //katalog z którego bierze plik index.html
        notify: false, //czy pokazywać tooltipa
        //host: "192.168.0.24", //IPv4 Address Wirless LAN adapter WiFi from ipconfig
        //port: 3000, //port na którym otworzy
        //browser: "google chrome" //jaka przeglądarka ma być otwierana - zaleznie od systemu - https://stackoverflow.com/questions/24686585/gulp-browser-sync-open-chrome-only
    });
});

gulp.task('sass', function () {
    return gulp.src('./styles/scss/main.scss')
        .pipe(wait(500))
        .pipe(plumber({
            errorHandler : showError
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed' //nested, expanded, compact, compressed
        }))
        .pipe(autoprefixer({
            browsers: ["last 2 versions"] //autoprefixy https://github.com/postcss/autoprefixer#browsers
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./styles/css'));
});

gulp.task('watch', function () {
    gulp.watch('./styles/scss/**/*.scss', ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('default', function() {
    console.log(gutil.colors.yellow('----- rozpoczynam pracę -----'));
    gulp.start(['browser-sync', 'sass', 'watch']);
});
