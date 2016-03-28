"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync");
var svgSprite = require('gulp-svg-sprite');

gulp.task("style", function() {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 1 version",
        "last 2 Chrome versions",
        "last 2 Firefox versions",
        "last 2 Opera versions",
        "last 2 Edge versions"
      ]})
    ]))
    .pipe(gulp.dest("css"))
    .pipe(server.reload({stream: true}));
});

gulp.task("serve", ["style"], function() {
  server.init({
    server: ".",
    notify: false,
    open: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html").on("change", server.reload);
});

  gulp.task("svg", function() {
  return gulp.src("img/")
 .pipe(svgSprite({
   mode: {
     symbol: {
       dest: ".",
       sprite: "build/img/svg-sprite.svg",
       example: false,
       render: {scss: {dest: "sass/global/svg-sprite.scss"}}
      }
     },
     svg: {
       xmlDeclaration: false,
       doctypeDeclaration: false
     }
     }))
 .pipe(gulp.dest("./"));
 });

