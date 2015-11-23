var gulp=require('gulp'),
    fs = require('fs-extra'),
    concat=require('gulp-concat'),
    uglify = require('gulp-uglify'),
    BUILD_JSON=require('./build.json'),
    BUILD_NAME='elliptical.transitions.js',
    MIN_NAME='elliptical.transitions.min.js',
    REPO_NAME='elliptical transitions',
    DIST='./dist';


gulp.task('default',function(){
    console.log(REPO_NAME + ' ..."tasks: gulp build|minify"');
});

gulp.task('build',function(){
    concatFileStream('./lib/transitions.js',DIST,BUILD_NAME);
    concatFileStream(['./node_modules/velocity-animate/velocity.js','./lib/velocity.transitions.js'],DIST,'elliptical.velocity.transitions.js');
});

gulp.task('minify',function(){
    minFileStream('./lib/transitions.js',DIST,MIN_NAME);
    minFileStream(['./node_modules/velocity-animate/velocity.js','./lib/velocity.transitions.js'],DIST,'elliptical.velocity.transitions.js');
});

function srcStream(src){
    if(src===undefined) src=BUILD_JSON;
    return gulp.src(src);
}

function concatStream(name,src){
    if(src===undefined) src=BUILD_JSON;
    return srcStream(src)
        .pipe(concat(name))
}

function fileStream(src,dest){
    gulp.src(src)
        .pipe(gulp.dest(dest));
}

function concatFileStream(src,dest,name){
    gulp.src(src)
        .pipe(concat(name))
        .pipe(gulp.dest(dest));
}

function minFileStream(src,dest,name){
    gulp.src(src)
        .pipe(concat(name))
        .pipe(uglify())
        .pipe(gulp.dest(dest));
}