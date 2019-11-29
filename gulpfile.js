

const url = {
	src: 'src/', 
	dist: 'dist/', 
	js : 'js/',
	pug : 'pug/',
	css : 'css/',
	stylus : 'stylus/',
	images : 'images/',
	icons : 'icons/',
	fonts : 'fonts/',
	virtualDomain : 'http://test/'
};
const port = 8088;
const virtualDomainMode = false;
const phpMode = false;



//gulp
const gulp = require('gulp');
const plumber = require("gulp-plumber");
const gulpIf = require("gulp-if");
const rename = require('gulp-rename');

//webpack
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const webpackConfigApp = require("./webpackApp.config");
gulp.task('webpack', function() {
	gulp.src(url.src + url.js + 'entry.js')
	.pipe(plumber())
	.pipe(webpackStream(webpackConfigApp, webpack))
	.pipe(gulp.dest(url.dist + url.js))
});

//js_vendor
const concat = require('gulp-concat');
gulp.task('jsVendor', () => {
	gulp.src(url.src + '_include/_vendor/' + '**/*/*.js')
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest(url.dist + url.js));
});

//pug
const pug = require('gulp-pug');
const pugOptions = {
	pretty: true,
	basedir: url.src
}

gulp.task('pug', () => {
	gulp.src([url.src + '**/*.pug', '!' + url.src + '**/_*.pug'])
		.pipe(plumber())
		.pipe(pug(pugOptions))
		.pipe(gulpIf(phpMode,
			rename({
				extname: '.php'
			})
		))
		.pipe(gulp.dest(url.dist));
});

//stylus
const stylus = require('gulp-stylus');

gulp.task('stylus', () => {
	gulp.src([url.src + '**/*.styl', '!' + url.src + '**/_*.styl'])
		.pipe(plumber())
		.pipe(stylus())
		.pipe(gulp.dest(url.dist))
});

//images
var changed  = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var imageminJpg = require('imagemin-jpeg-recompress');
var imageminPng = require('imagemin-pngquant');
var imageminGif = require('imagemin-gifsicle');
var svgmin = require('gulp-svgmin');

gulp.task('imagemin', () => {
	var srcGlob = url.src + url.images + '/**/*.+(jpg|jpeg|png|gif)';
	var dstGlob = url.dist + url.images;
	gulp.src( srcGlob )
		.pipe(changed( dstGlob ))
		.pipe(imagemin([
			imageminPng(),
			imageminJpg(),
			imageminGif({
				interlaced: false,
				optimizationLevel: 3,
				colors:180
			})
		]))
		.pipe(gulp.dest( dstGlob ));
});
gulp.task('svgmin', function(){
	var srcGlob = url.src + url.images + '/**/*.+(svg)';
	var dstGlob = url.dist + url.images;
	gulp.src( srcGlob )
		.pipe(changed( dstGlob ))
		.pipe(svgmin())
		.pipe(gulp.dest( dstGlob ));
});


//Browser Sync
const browserSync = require("browser-sync");
gulp.task('browser-sync', () => {
	if(virtualDomainMode) {
		browserSync.init({
			files: [url.src + '**/*.pug', '!' + url.src + '**/_*.pug'],
			proxy: url.virtualDomain,
			open: 'external' //「open: 'external'」オプション
		});
	} else {
		browserSync({
			port: port,
			server: {
				baseDir: url.dist
			}
		});
	}
	gulp.watch(url.dist + "**/*.html", ['reload']);
	gulp.watch(url.dist + "**/*.js", ['reload']);
	gulp.watch(url.dist + "**/*.css", ['reload']);
	gulp.watch(url.dist + "**/*.{png,jpg,gif,svg}", ['reload']);
});
gulp.task('reload', () => {
	browserSync.reload();
});

const iconfont    = require('gulp-iconfont');
const consolidate = require('gulp-consolidate');
const fontName = 'myfont';
 
gulp.task('iconfont', function(){
	return gulp.src([url.src + url.fonts + url.icons + '*.svg'])
	.pipe(iconfont({
		fontName: fontName,
		prependUnicode: true,
		formats: ['ttf', 'eot', 'woff']
	}))
	.on('glyphs', function(glyphs) {
		var options = {
			glyphs: glyphs.map(function(glyph) {
			return { name: glyph.name, codepoint: glyph.unicode[0].charCodeAt(0) }
			}),
			fontName: fontName,
			fontPath: '../fonts/',
			className: 'is-iconFont'
		};
		gulp.src(url.src + url.icons +'iconfont.css')
			.pipe(consolidate('lodash', options))
			.pipe(
				rename({
					basename: '_s_' + fontName,
					extname: '.styl'
				})
			)
			.pipe(gulp.dest(url.src + url.stylus + '_include/_settings/'));

		gulp.src(url.src + url.icons +'myfont.html')
			.pipe(consolidate('lodash', options))
			.pipe(rename({ basename:'sample' }))
			.pipe(gulp.dest(url.dist + url.fonts));
	})
	.pipe(gulp.dest(url.dist + url.fonts));
});

//watch
gulp.task('watch', function () {
	gulp.watch(url.src + url.js + 'entry.js', ['webpack']);
	// gulp.watch(url.src + url.js + '_include/' + '**/*.js', ['webpack']);
	gulp.watch(url.src + '**/*.js', ['webpack']);

	gulp.watch(url.src + url.js + '_include/_vendor' + '**/*.js', ['jsVendor']);
	gulp.watch([url.src + '**/*.pug', '!' + url.src + '**/_*.pug'], ['pug']);
	gulp.watch(url.src + '**/*.styl', ['stylus']);
	gulp.watch(url.src + url.images + '/**/*.+(jpg|jpeg|png|gif)', ['imagemin']);
	gulp.watch(url.src + url.images + '/**/*.+(svg)', ['svgmin']);
	gulp.watch(url.src + url.fonts + url.icons + '*.svg', ['iconfont']);
});

gulp.task('build', ['webpack', 'jsVendor', 'pug', 'stylus', 'imagemin','svgmin']);
gulp.task('default', ['browser-sync', 'watch']);

