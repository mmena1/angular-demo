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
	sourcemaps = require('gulp-sourcemaps'),
	tsProject = ts.createProject('tsconfig.json'),
	Server = require('karma').Server;
;

gulp.task('build', gulp.series(clean, validateSources, compile, copyResources, copyNpmDependenciesOnly));
gulp.task('watch', gulp.series(buildWatch));
gulp.task('clean', gulp.series(clean));
gulp.task('compile', gulp.series(validateSources, compile));

// build is not needed as it is automatically called when running 'npm test'
gulp.task('test', gulp.series(compileTests, test));

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

function buildWatch() {
	//return gulp.watch([ './src/**/*.*', './testing/**/*.*' ], gulp.series('build'));

	gulp.watch([ "src/**/*.ts" ], gulp.series('compile')).on('change', function(e) {
		console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
	});
	gulp.watch([ "testing/**/*.ts" ], gulp.series(compileTests)).on('change', function(e) {
		console.log('TypeScript test ' + e.path + ' has been changed. Compiling.');
	});
	gulp.watch([ "src/**/*.html", "src/**/*.css" ], gulp.series(copyResources)).on('change', function(e) {
		console.log('Resource file ' + e.path + ' has been changed. Updating.');
	});
}

function validateSources() {
	return gulp.src("src/**/*.ts")
		.pipe(tslint({
			formatter : 'prose'
		}))
		.pipe(tslint.report());
}

function compileTests() {
	var tsResult = gulp.src("testing/**/*.ts")
		.pipe(sourcemaps.init())
		.pipe(tsProject());

	return tsResult.js
		.pipe(sourcemaps.write(".", {
			sourceRoot : '/testing'
		}))
		.pipe(gulp.dest('testing'));
}

function compile() {
	var tsResult = gulp.src("src/**/*.ts")
		.pipe(sourcemaps.init())
		.pipe(tsProject());

	return tsResult.js
		.pipe(sourcemaps.write(".", {
			sourceRoot : '/src'
		}))
		.pipe(gulp.dest('build'));
}

function copyResources() {
	return gulp.src([ "src/**/*", "!**/*.ts" ])
		.pipe(gulp.dest("build"));
}

function testOnce(done) {
	new Server({
		configFile : __dirname + '/karma.conf.js',
		singleRun : true
	}, done).start();
}

function test(done) {
	new Server({
		configFile : __dirname + '/karma.conf.js',
	}, done).start();
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