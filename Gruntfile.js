// Load Grunt
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Tasks
    sass: { // Begin Sass Plugin
      dist: {
        options: {
          sourcemap: 'none',
        },
        files: [{
          expand: true,
          cwd: 'assets/styles',
          src: ['**/*.scss'],
          dest: 'dist/styles',
          ext: '.css'
      }]
      }
    },


    postcss: { // Begin Post CSS Plugin
      options: {
        map: true,
        processors: [
      require('autoprefixer')({
            browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
          })
    ]
      },
      dist: {
        src: ['dist/styles/style.css']
      }
    },
    cssmin: { // Begin CSS Minify Plugin
      target: {
        files: [{
          expand: true,
          cwd: 'dist/styles',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/styles',
          ext: '.min.css'
    }]
      }
    },
    uglify: { // Begin JS Uglify Plugin
      build: {
        src: ['assets/script/**/*.js'],
        dest: 'dist/script/script.min.js'
      }
    },
    watch: { // Compile everything into one task with Watch Plugin
      css: {
        files: '**/*.scss',
        tasks: ['sass', 'postcss', 'cssmin']
      },
      js: {
        files: '**/*.js',
        tasks: ['uglify']
      }
    },
    
  });
  // Load Grunt plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register Grunt tasks
  grunt.registerTask('default', ['watch']);
};
