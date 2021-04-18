var { task, src, watch, dest } = require("gulp");
var autoprefixer = require("gulp-autoprefixer");
var sass = require("gulp-sass");
var imagemin = require("gulp-imagemin");
var merge = require("merge-stream");

sass.compiler = require("node-sass");

function scss() {
  return src("src/scss/**/*.scss")
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(dest("dist/css"));
}

function imgmin() {
  return src("src/assets/images/*.*")
    .pipe(imagemin())
    .pipe(dest("dist/images"));
}

task("watch", () => {
  scss();
  imgmin();

  watch("src/assets/images/*.*", imgmin);
  watch("src/scss/**/*.scss", scss);
});

var gulp = require("gulp");
var ghPages = require("gulp-gh-pages");

gulp.task("deploy", function () {
  return gulp.src("./dist/**/*").pipe(ghPages());
});
