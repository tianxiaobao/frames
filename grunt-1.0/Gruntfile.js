//包装函数
module.exports = function(grunt){
  //任务配置,所有插件的配置信息
  grunt.initConfig({
    //获取package.json的信息
    pkg: grunt.file.readJSON('package.json'),
    //jshint插件的配置信息-检查js语法错误
    jshint: {
      build: ['Gruntfile.js', 'src/js/*.js'],
      options: {
        jshintrc: 'code.jshintrc'
      }
    },
    //uglify插件的配置信息-压缩js代码
    uglify: {
      build: {
        options: {
          mangle: false, //不混淆变量名
          preserveComments: 'all', //不删除注释，还可以为 false（删除全部注释），some（保留@preserve @license @cc_on等注释）
          footer:'\n/*! <%= pkg.name %> 最后修改于： <%= grunt.template.today("yyyy-mm-dd") %> */'//添加footer
        },
        files: [{
          expand: true,
          cwd: 'src/js',
          src: '**/*.js',
          dest: 'dist/js'
        }]
      }
    },
    //watch插件的配置信息-监控文件变化
    watch: {
      build: {
        files: ['src/*.js', 'src/*.css'],
        tasks: ['jshint', 'csslint'],
        options: {spawn: false}
      }
    },
    //csslint插件的配置信息-检查css语法错误
    csslint: {
      build: ['src/css/*.css'],
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
        files: [{
          expand: true,
          cwd: 'src/css',
          src: '**/*.css',
          dest: 'dist/css'
        }]
      }
    },
    // 自动雪碧图并替换css路径
    sprite: {
      options: {
        // sprite背景图源文件夹
        imagepath: 'src/img/',
        // 映射CSS中背景路径，支持函数和数组，默认为 null
        imagepath_map: null,
        // 雪碧图输出目录，注意，会覆盖之前文件！
        spritedest: 'dist/img/',
        // 替换后的背景路径
        spritepath: '../img/',
        // 各图片间间距，如果设置为奇数，会强制+1以保证生成的2x图片为偶数宽高，默认 0
        padding: 2,
        // 是否使用 image-set 作为2x图片实现，默认不使用
        useimageset: false,
        // 是否以时间戳为文件名生成新的雪碧图文件，如果启用请注意清理之前生成的文件，默认不生成新文件
        newsprite: false,
        // 给雪碧图追加时间戳，默认不追加
        spritestamp: true,
        // 在CSS文件末尾追加时间戳，默认不追加
        cssstamp: true,
        // 默认使用二叉树最优排列算法
        algorithm: 'binary-tree',
        // 默认使用`pngsmith`图像处理引擎
        engine: 'pngsmith'
      },
      autoSprite: {
        files: [{
          // 启用动态扩展
          expand: true,
          // css文件源的文件夹
          cwd: 'src/css/',
          // 匹配规则
          src: '*.css',
          // 导出css路径地址
          dest: 'dist/css/',
          // 导出的css名
          ext: '.css'
        }]
      }
    },
    //文件名加入时间戳
    filerev: {
      options: {
        algorithm: 'md5',
        length: 8
      },
      assets: {
        files: [{
          src: [
          'build/**/*.{css,js}'
          ]
        }]
      }
    },
    //文件替换，默认替换掉css与js
    usemin: {
      html: ['build/**/*.html'],      // 注意此处是build/
      options: {
        blockReplacements: {
        }
      }
    },
    //文件删除
    clean:{
      build:{
        src:'dist'
      }
    },
    //文件复制-包含文件夹及其内部文件
    copy: {
      main: {
        expand: true,
        cwd: 'src',
        //src: '*.html',
        src: ['tpl/**','img/**'],
        dest: 'dist/'
      }
    },
  });
  //告诉grunt我们将使用插件
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-css-sprite');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-filerev');

  //告诉grunt当我们在终端输入grunt时需要做些什么,注意先后顺序
  grunt.registerTask('default', ['clean','csslint','cssmin','copy','jshint','uglify']);
  grunt.registerTask('css', ['csslint','sprite','cssmin']);
  grunt.registerTask('replace', ['filerev','usemin']);
};