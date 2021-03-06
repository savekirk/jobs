module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),
    banner: '/* <%= pkg.name %> <%= pkg.version %> \n' + '* By <%= pkg.author %> \n' + '* Distributed under <%= pkg.license %> \n' + '* Copyrights <%= grunt.template.today("yyyy") %> . All Rights Reserved */\n',
    jshint: {
      options: {
        ignores: ['./node_modules', './public/js/**/*.min.js'],
        node: true,
        eqeqeq: true,
        curly: true,
        debug: true,
        eqnull: true,
        multistr: true,
        asi: false,
        quotmark: true,
        globals: {
          jquery: true,
          browser: true
        }
      },
      all: ['routes/**/*.js', 'public/**/*.js', 'app.js', 'Grunfile.js']
    },
    uglify: {
      options: {
        mangle: {
          except: ['jQuery', '$']
        },
        banner: '<%= banner %>'
      },
      my_target: {
        files: {}
      }
    },
    stylus: {
      compile: {
        options: {
          banner: '<%= banner %>',
          compress: false,
          paths: ['./views/stylesheets']
        },
        files: {

        }
      }
    },
    cssmin: {
      compress: {
        options: {
          banner: '<%= banner %>'
        },
        files: {
        }
      }
    },
    watch: {
      scripts: {
        files: ['!node_modules', 'app.js', 'Grunfile.js', './public/**/*.js', './routes/**/*.js'],
        options: {
          livereload: 3355,
          events: ['all']
        },
        tasks: ['jshint', 'uglify']
      },
      stylus: {
        files: ['!node_modules', './**/*.styl'],
        options: {
          events: ['all']
        },
        tasks: ['stylus', 'cssmin']
      },
      css: {
        files: ['!node_modules', './public/**/*.css'],
        options: {
          events: ['all'],
          livereload: 3355
        },
        tasks: ['cssmin']
      },
      jade: {
        files: ['!node_modules', './views/**/*.jade'],
        options: {
          events: ['all'],
          livereload: 3355
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'uglify', 'stylus', 'cssmin', 'watch']);
};
