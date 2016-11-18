//导入所需模块
var gulp = require('gulp'),
	stylish = require('jshint-stylish')//高亮提示
	less = require('gulp-less'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	csslint = require('gulp-csslint'),
	cssmin = require('gulp-clean-css'),
	//imagemin = require('gulp-imagemin'),
	//pngquant = require('imagemin-pngquant'),
	//cache = require('gulp-cache'),
	rename = require('gulp-rename'),
	spriter = require('gulp-css-spriter');
	//less插件的配置信息
	gulp.task('less', function () {
		gulp.src('src/pagination/less/*.less')		//源文件目录
			.pipe(less())				//该任务调用的模块
			.pipe(gulp.dest('src/pagination/less'));//生成文件目录
	});
	//检测JS
	gulp.task('jshint', function(){
		gulp.src('src/js/*.js')
			.pipe(jshint())
			.pipe(jshint.reporter(stylish));
	});
	//压缩js
	gulp.task('uglify', function(){
		gulp.src('src/js/*.js')
			.pipe(uglify())
			.pipe(gulp.dest('dist/js'));
	});
	//合并js
	gulp.task('concat',function(){
    gulp.src('dist/js/*.js')
        .pipe(concat("lib.js"))      //合并所有的js文件到libs.js
        .pipe(gulp.dest("dist/js"))  //合并后文件放入目标文件夹
        .pipe(uglify())
        .pipe(rename("lib.min.js"))  //重命名
        .pipe(gulp.dest('dist/js'))  //将混淆后文件放入目标文件夹
	});
	//检测css
	gulp.task('csslint', function() {
		gulp.src('dist/css/*.css')
			.pipe(csslint())
			.pipe(csslint.reporter());
	});
	//压缩css
	gulp.task('cssmin', function(){
		gulp.src('dist/css/*.css')
			.pipe(cssmin())
			.pipe(gulp.dest('dist/css'));
	});
	//图片压缩生成雪碧图
	gulp.task('spriter', function() {
		var timestamp = +new Date();
		gulp.src('dist/css/*.css')
			.pipe(spriter({
				'spriteSheet': 'dist/img/sprite'+timestamp+'.png',// 生成的spriter的位置
				'pathToSpriteSheetFromCSS': '../img/sprite'+timestamp+'.png'// 生成样式文件图片引用地址的路径
			}))
			.pipe(cssmin())
			.pipe(gulp.dest('dist/css'));
	});
	//图片压缩
	// gulp.task('imagemin', function () {
	//	gulp.src('src/img/*.{png,jpg,gif,ico}')
	//		.pipe(imagemin())
	//		.pipe(gulp.dest('dist/img'));
	// });
gulp.task('default',['less','jshint','uglify']); //定义默认任务