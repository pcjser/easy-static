//引入gulp
var gulp = require('gulp');

//引入组件
var sass = require('gulp-sass');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var imagemin = require('gulp-imagemin');
var del = require('del');

gulp.task('css', function() {
  return gulp.src('src/css/*.css')
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.init())
    .pipe(gulp.dest('./dist/css'))
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(reload({
      stream: true
    }));
})

gulp.task('sass', function () {
  return gulp.src(['src/sass/*.scss', 'src/sass/*.sass'])
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.init())
    .pipe(gulp.dest('./dist/css'))
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(reload({
      stream: true
    }));
})

gulp.task('less', function () {
  return gulp.src('src/less/*.less')
    .pipe(less())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.init())
    .pipe(gulp.dest('./dist/css'))
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(reload({
      stream: true
    }));
})

gulp.task('js', function () {
  return gulp.src('src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('./dist/js'))
    // .pipe(browserify())
    .pipe(uglify())
    .pipe(rename({
      // prefix: "bonjour-",  //添加前缀
      suffix: '.min' //添加后缀
    }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(reload({
      stream: true
    }))
})

gulp.task('image', function () {
  return gulp.src('src/images/*')
    .pipe(imagemin([
      imagemin.gifsicle({
        interlaced: true
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 5
      }),
      imagemin.svgo({
        plugins: [{
            removeViewBox: true
          },
          {
            cleanupIDs: false
          }
        ]
      })
    ], {
      verbose: true
    }))
    .pipe(gulp.dest('./dist/images'));
})

gulp.task('clean', function () {
  return del(['./dist']); // 加return 方法变为同步
})

gulp.task('default', ['clean'], function () {
  gulp.start('serve');
})

gulp.task('serve', ['css', 'sass', 'js', 'image', 'less'], function() {
    browserSync.init({
    files: ['**'],
    server: {
      baseDir: './',
      index: './index.html'
    },
    port: 8888
  });  
  gulp.watch('src/css/*.css', ['css']);
  gulp.watch(['src/sass/*.scss', 'src/sass/*.sass'], ['sass']);
  gulp.watch('src/less/*.less', ['less']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('src/images/*', ['image'])
  gulp.watch("./*.html").on('change', reload);
})
