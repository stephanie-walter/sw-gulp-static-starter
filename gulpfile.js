var gulp = require('gulp');

// Load the packages needed
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var less = require('gulp-less');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var reload = browserSync.reload;


// Environement variables
var paths = {
  root: './',
  src: {
    less: './assets/src/less/*.less',
    js: './assets/src/js/*.js',
  },
  dist: {
    css: './assets/dist/css/',
    js: './assets/dist/js/',
  }
};


/*
 * CSS task :Less compilation, autoprefixer, minification
 */

gulp.task('css', function () {
  return gulp.src(paths.src.less) // Where can I find my less files
    .pipe(less()) // Compile LESS
    .pipe(autoprefixer()) // Will autoprefix the css
    .pipe(minifycss()) // Minify the CSS
    .pipe(rename({ // Rename the file with suffix
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.dist.css)) // Where do I send my CSS files
    .pipe(browserSync.stream()); // Trigger browser sync
});


/*
 * JS task : minify + uglify
 */

gulp.task('js', function () {
  return gulp.src(paths.src.js) // Where can I find my js files
    .pipe(uglify()) // Will minify the JS
    .pipe(rename({ // Rename the file with suffix
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.dist.js))
    .pipe(browserSync.stream()); // Trigger browser sync
});


/*
 * Prepare da watches
 */

gulp.task('watch', function () {
  gulp.watch(paths.src.less, ['css']); // Watching less folders
  gulp.watch(paths.src.js, ['js']); // Watching js folders
  browserSync({ // Start the browsersync server
    server: {
      baseDir: paths.root
    }
  });
  gulp.watch(['*.html', paths.dist.css], reload); // Watching HTML, JS and CSS files for changes
});


/*
 * Working test (gulp work in terminal)
 */

gulp.task('work', ['css', 'js', 'watch']);
