const gulp = require("gulp");
const runSequence = require("run-sequence");
const del = require("del");

const babel = require("gulp-babel");
const babelRegister = require("babel-register");

const mocha = require("gulp-mocha");
const istanbul = require("gulp-babel-istanbul");
const isparta = require("isparta");
const coverageEnforcer = require("gulp-istanbul-enforcer");

const paths = {
  src: "./src/**/*.js",
  tests: "./tests/**/*.js",
  coverage: "./coverage",
  distribution: "./lib"
};


// Development

gulp.task("dev", ["dev:test"], () => {
  return gulp.watch([paths.src, paths.tests], ["dev:test"]);
});

gulp.task("dev:test", () => {
  return gulp.src(paths.tests)
    .pipe(mocha({
      compilers: babelRegister,
      reporter: "spec"
    }));
});


// Publishing

gulp.task("prepare-publish", () => {
  return runSequence(
    "prepare-publish:clean",
    "prepare-publish:test-coverage",
    "prepare-publish:build-distribution"
  );
});

gulp.task("prepare-publish:clean", () => {
  return del([paths.coverage, paths.distribution]);
});

gulp.task("prepare-publish:test-coverage", (cb) => {
  gulp.src(paths.src)
    .pipe(istanbul({
      instrumenter: isparta.Instrumenter,
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire())
    .on("finish", () => {
      gulp.src(paths.tests)
        .pipe(mocha({
          compilers: babelRegister,
          reporter: "spec"
        }))
        .pipe(istanbul.writeReports({
          dir: paths.coverage
        }))
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 100 } }))
        .on("end", cb);
    });
});

gulp.task("prepare-publish:build-distribution", () => {
  return gulp.src(paths.src)
    .pipe(babel())
    .pipe(gulp.dest(paths.distribution));
});
