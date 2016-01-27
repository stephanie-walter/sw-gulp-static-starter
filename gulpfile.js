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

// Where can I find my less files
  return gulp.src(paths.src.less)

// Compile LESS
  .pipe(less())

// Will autoprefix the css
  .pipe(autoprefixer())

// Rename the file with suffix
  .pipe(rename({
    suffix: '.min'
  }))

// Where do I send my CSS files
  .pipe(gulp.dest(paths.dist.css))

// Trigger browser sync
  .pipe(browserSync.stream());
});


/*
 * JS task : minify + uglify
*/

gulp.task('js', function () {

// Where can I find my js files
  return gulp.src(paths.src.js)

// Will minify the JS
  .pipe(uglify())

// Rename the file with suffix
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest(paths.dist.js))

// Trigger browser sync
  .pipe(browserSync.stream());

});



/*
 * Prepare da watches
 */

gulp.task('watch', function () {

// Watching less and js folders
  gulp.watch(paths.src.less, ['css']);
  gulp.watch(paths.src.js, ['js']);

// Start the browsersync server
  browserSync({
    server: {
      baseDir: paths.root
    }
  });

// Watching HTML, JS and CSS files for changes
  gulp.watch(['*.html', paths.dist.css], reload);
});


/*
 * Working test (gulp work in terminal)
 */

gulp.task('work', ['css', 'js', 'watch']);
