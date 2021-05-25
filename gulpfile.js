var gulp = require("gulp"),
    autoprefixer = require("autoprefixer"),
    concat = require("gulp-concat"),
    cssnano = require("cssnano"),
    //   del = require("del"),
    imagemin = require("gulp-imagemin"),
    // merge = require("merge-stream"),
    mqpacker = require("css-mqpacker"), //mqpacker is dead but no alternative
    // newer = require("gulp-newer"),
    postcss = require("gulp-postcss"),
    rename = require("gulp-rename"),
    sass = require("gulp-dart-sass"),
    sourcemaps = require("gulp-sourcemaps"),
    terser = require("gulp-terser");
//   uglify = require("gulp-uglify"),
//   uncss = require("postcss-uncss");

var paths = {
    styles: {
        // By using styles/**/*.sass we're telling gulp to check all folders for any sass file
        // src: "./sass/*.scss",
        src: ["./themes/acme/resources/sass/*.scss",
              "./themes/acme/resources/sass/*/*.scss" ],
        // Compiled files will end up in whichever folder it's found in (partials are not compiled)
        dest: "./themes/acme/assets/css",
    },
    scripts: {
        src: "./themes/acme/resources/js/*.js",
        dest: "./themes/acme/assets/js",
    },

    images: {
        src: "./themes/acme/resources/images/*",
        dest: "./themes/acme/assets/images",
    },gulp

 
};

// CSS
function style() {
    return (
        gulp
            .src(paths.styles.src)
            // Initialize sourcemaps before compilation starts
            .pipe(sourcemaps.init())
            .pipe(sass())
            .on("error", sass.logError)
            // Use postcss with media query packer, autoprefixer and compress the compiled file using cssnano
            .pipe(
                postcss([
                    mqpacker(),
                    autoprefixer(),
                    // uncss to remove unused css
                    //     uncss({html: [
                    //     'http://localhost/index.html',
                    //     'http://localhost/about.html',
                    // ]}),
                    //  cssnano()
                ])
            )
            // Now add/write the sourcemaps
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest(paths.styles.dest))
    );
}

// Minify Images & Optimise Images
function images() {
    return gulp
        .src(paths.images.src)
        .pipe(
            imagemin([
                imagemin.gifsicle({ interlaced: true }),
                imagemin.mozjpeg({ 
                    quality: 75, 
                    progressive: true
                 }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({
                    plugins: [
                        {
                            removeViewBox: false,
                            collapseGroups: true,
                        },
                    ],
                }),
            ])
        )
        .pipe(gulp.dest(paths.images.dest));
}


// Transpile, concatenate and minify scripts
function scripts() {
    return gulp
        .src(paths.scripts.src)
        .pipe(concat("scripts.js"))
        .pipe(rename("scripts.min.js"))
        .pipe(terser(
            {
                parse: {
                    // parse options
                },
                compress: {
                    // compress options
                },
                mangle: {
                    // mangle options
            
                    properties: {
                        // mangle property options
                    }
                },
                format: {
                    // format options (can also use `output` for backwards compatibility)
                },
                sourceMap: {
                    // source map options
                },
                ecma: 5, // specify one of: 5, 2015, 2016, etc.
                keep_classnames: false,
                keep_fnames: false,
                ie8: false,
                module: false,
                nameCache: null, // or specify a name cache object
                safari10: false,
                toplevel: false
            }
        ))
        .pipe(gulp.dest(paths.scripts.dest))
       
}



// Add browsersync initialization at the start of the watch task
function watch() {
    gulp.watch(paths.styles.src, style);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.scripts.src, scripts);
}

// Copy vendor files to assets
function vendor() {

//   // Fonts
//   var fonts = gulp
//     .src("./themes/acme/resources/fonts/*.*")
//     .pipe(gulp.dest("./themes/acme/assets/fonts/"));



  // jQuery
  var jquery = gulp
    .src([
      "./node_modules/jquery/dist/*",
      "!./node_modules/jquery/dist/core.js"
    ])
    .pipe(gulp.dest("./themes/acme/assets/vendor/jquery"));



  return merge(

//     fonts,
    jquery,

  );
}

// We don't have to expose the reload function
// It's currently only useful in other functions

// Don't forget to expose the task!
exports.watch = watch;

// Expose the task by exporting it
// This allows you to run it from the commandline using
// $ gulp style
exports.style = style;

// expose images task
exports.images = images;
//expose js
exports.scripts = scripts;

exports.vendor = vendor;

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var build = gulp.parallel(style, watch);

/*
 * You can still use `gulp.task` to expose tasks
 */
//gulp.task('build', build);

/*
 * Define default task that can be called by just running `gulp` from cli
 */
gulp.task("default", build);
