var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var imagemin     = require('gulp-imagemin');

// variables
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};
var sassProduction = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 1%', 'IE 9', 'Firefox ESR'],
  cascade: false
};

// Static Server + watching scss/html/js files
gulp.task('serve', ['sass'], function() {
  browserSync.init({
      server: "./"
  });

  gulp.watch(["assets/css/*.scss", "assets/css/**/*.scss"], ['sass']);
  gulp.watch("assets/js/**").on('change', browserSync.reload);
  gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("assets/css/style.scss")
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("assets/css"))
    .pipe(browserSync.stream());
});

// Minify CSS
gulp.task('sass-min', function() {
  return gulp.src("assets/css/style.scss")
    .pipe(sass(sassProduction).on('error', sass.logError))
    .pipe(gulp.dest("assets/css"));
});

gulp.task('image', function() {
  return gulp.src(['assets/images/*'])
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest('assets/images/production'));
});


gulp.task('default', ['sass', 'serve']);
gulp.task('production', ['sass-min', 'image-min']);
