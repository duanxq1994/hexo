var gulp = require('gulp');
var cssclean = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var htmlclean = require('gulp-htmlclean');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
// 压缩 public 目录 css
gulp.task('minify-css', function () {
    return gulp.src('./public/css/*.css')
        .pipe(cssclean())
        .pipe(gulp.dest('./public/css/'));
});
// 压缩 public 目录 html
gulp.task('minify-html', function () {
    return gulp.src('./public/**/**/*.html')
        .pipe(htmlclean())
        .pipe(htmlmin({
            removeComments: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
        }))
        .pipe(gulp.dest('./public/'))
});
// 压缩 public/js 目录 js
gulp.task('minify-js', function () {
    return gulp.src('./public/js/src/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/js/src/'));
});
// 压缩图片任务
gulp.task('images', function () {
    gulp.src('./public/images/*.*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('./public/images/'));
});
// 执行 gulp 命令时执行的任务
gulp.task('default', ['minify-css', 'minify-js', 'images']);