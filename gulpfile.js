var gulp = require('gulp'),
	del = require('del'),
	gnf = require('gulp-npm-files'),
	inject = require('gulp-inject'),
	uglify = require('gulp-uglify'),
	minifycss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	filter = require('gulp-filter'),
	ts = require('gulp-typescript'),
	tslint = require('gulp-tslint'),
	tsProject = ts.createProject('tsconfig.json');

gulp.task('build', gulp.series(clean, validateSources, compile, copyResources, copyNpmDependenciesOnly));
gulp.task('watch', gulp.series(buildWatch));
gulp.task('clean', gulp.series(clean));
gulp.task('compile', gulp.series(compile));

function clean() {
	return del([ 'build' ]).then(paths => {
		console.log('Deleted files and folders:\n', paths.join('\n'))
	});

}

function copyIndex(done) {
	var npmFiles = gulp.src([ './dist/vendor/js/vendor.all.min.js' ], {
		read : false
	});
	return gulp.src('./src/index.html').pipe(inject(npmFiles, {
		name : 'app',
		ignorePath : 'node_modules',
		addPrefix : 'vendor'
	})).pipe(gulp.dest('./build', {
		overwrite : true
	}));
}

function copyNpmDependenciesOnly(done) {
	return gulp.src(gnf(), {
		base : './node_modules'
	}).pipe(gulp.dest('./build/node_modules', {
		overwrite : true
	}));
	done();
}

function buildWatch(done) {
	return gulp.watch('./src/**/*.*', gulp.series('build'));
}

function validateSources() {
	return gulp.src("src/**/*.ts")
		.pipe(tslint({
			formatter : 'prose'
		}))
		.pipe(tslint.report());
}

function compile() {
	var tsResult = gulp.src("src/**/*.ts").pipe(tsProject());

	return tsResult.js.pipe(gulp.dest('build'));
}

function copyResources() {
	return gulp.src([ "src/**/*", "!**/*.ts" ])
		.pipe(gulp.dest("build"));
}

function minifyDependencies(done) {
	var jsFilter = filter('**/*.js', {
		restore : true
	})
	//		cssFilter = filter('*.css', {
	//			restore : true
	//		});
	return gulp.src(gnf(), {
		base : './node_modules'
	}).pipe(gulp.dest('./build/vendor/js', {
		overwrite : true
	}))
		.pipe(jsFilter)
		.pipe(concat('vendor.all.js'))
		.pipe(gulp.dest('./build/vendor/js/'))
		.pipe(uglify())
		.pipe(rename('vendor.all.min.js'))
		.pipe(gulp.dest('./build/vendor/js/'))
		.pipe(jsFilter.restore)
	//		.pipe(cssFilter)
	//		.pipe(concat('vendor.all.css'))
	//		.pipe(gulp.dest('./build/vendor/css'))
	//		.pipe(minifycss())
	//		.pipe(rename('vendor.all.min.css'))
	//		.pipe(gulp.dest('./build/vendor/css'));
	done();
}