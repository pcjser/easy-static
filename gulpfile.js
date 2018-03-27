//引入gulp
var gulp = require('gulp');

//引入组件
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");

gulp.task('default', ['serve'])

gulp.task('sass', function () {
  return gulp.src('src/scss/*.scss')
    .pipe(sass())
    .pipe(postcss([ autoprefixer() ]))    
    .pipe(sourcemaps.init())    
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))    
    .pipe(gulp.dest('dist/css'))
    .pipe(reload({
      stream: true
    }))
})

gulp.task('js', function() {
  return gulp.src('src/js/*.js')
      // .pipe(browserify())
      .pipe(uglify())
      .pipe(rename({
        // prefix: "bonjour-",  //添加前缀
        suffix: '.min'    //添加后缀
      }))
      .pipe(gulp.dest('dist/js'))
      .pipe(reload({
        stream: true
      }))
})

gulp.task('serve', ['sass', 'js'], function () {
  browserSync.init({
    files: ['**'],
    server: {
      baseDir: './',
      index: './index.html'
    },
    port: 8888
  })
  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch("./*.html").on('change', reload);
})