//包装函数
module.exports = function(grunt){
	
	//任务配置,所有插件的配置信息
	grunt.initConfig({
		
		//获取package.json的信息
		pkg: grunt.file.readJSON('package.json'),
		
		//jshint插件的配置信息-检查js语法错误
		jshint: {
			build: ['Gruntfile.js', 'src/*.js'],
			options: {
				jshintrc: 'code.jshintrc'
			}
		},
		//uglify插件的配置信息-压缩js代码
		uglify: {
			options: {
				stripBanners: true,
				banner: '/*| <%=pkg.name%>-<%=pkg.version%>.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'src/test.js',
				dest: 'build/<%=pkg.name%>-<%=pkg.version%>.js.min.js'
			}
		},
		//csslint插件的配置信息-检查css语法错误
		csslint: {
			build: ['src/*.css'],
			options: {
				csslintrc: 'code.csslintrc'
			}
		},
		//cssmin插件的配置信息-压缩css代码
		cssmin: {
			options: {
				stripBanners: true,
				banner: '/*| <%=pkg.name%>-<%=pkg.version%>.css <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'src/test.css',
				dest: 'build/<%=pkg.name%>-<%=pkg.version%>.css.min.css'
			}
		},
		//watch插件的配置信息-监控文件变化
		watch: {
			build: {
				files: ['src/*.js', 'src/*.css'],
				tasks: ['jshint', 'csslint'],
				options: {spawn: false}
			}
		}	
	});
	//告诉grunt我们将使用插件
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	//告诉grunt当我们在终端输入grunt时需要做些什么,注意先后顺序
	grunt.registerTask('default', ['jshint','uglify','watch','csslint','cssmin']);
};