module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({
    watch: {
      sass: {
        files: ['assets/css/src/sass/**/*.scss'],
        tasks: ['sass', 'concat', 'cssmin']
      },
      js: {
        files: ['assets/js/src/**/*.js'],
        tasks: ['uglify']
      },
    },
    sass: {
      dist: {
        options: {
          style: 'expanded',
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          cwd: 'assets/css/src/sass',
          src: ['**/*.scss'],
          dest: 'assets/css/src',
          ext: '.css'
        }]
      }
    },
    concat: {
      css: {
        src: ['node_modules/normalize.css/normalize.css',
          'node_modules/font-awesome/css/font-awesome.css',
          'node_modules/animate.css/animate.min.css',
          'node_modules/codemirror/lib/codemirror.css',
          'node_modules/codemirror/theme/mdn-like.css',
          'assets/css/src/main.css'
        ],
        dest: 'assets/css/src/main.css',
      },
    },
    copy: {
      main: {
        files: [{
          expand: true,
          flatten: true,
          src: ['node_modules/font-awesome/fonts/**'],
          dest: 'assets/fonts'
        }],
      },
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'assets/css/src',
          src: ['*.css', '!*.min.css'],
          dest: 'assets/css/',
          ext: '.min.css'
        }]
      }
    },
    uglify: {
      target: {
        files: {
          'assets/js/app.min.js': ['node_modules/jquery/dist/jquery.min.js',
            'node_modules/perfect-scrollbar/dist/js/min/perfect-scrollbar.jquery.min.js',
            'node_modules/showdown/dist/showdown.min.js',
            'node_modules/noty/js/noty/packaged/jquery.noty.packaged.min.js',
            'node_modules/jquery-pjax/jquery.pjax.js',
            'node_modules/jquery-serializejson/jquery.serializejson.min.js',
            'node_modules/codemirror/lib/codemirror.js',
            'node_modules/codemirror/mode/markdown/markdown.js',
            'node_modules/textarea-autosize/dist/jquery.textarea_autosize.js',
            'assets/js/src/**/*.js'
          ]
        }
      }
    }
  });

  grunt.registerTask('default', ['copy', 'sass', 'concat', 'cssmin', 'uglify']);
};