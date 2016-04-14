module.exports = function(grunt) {

  var SOURCE_FILES = [
    'src/ts/**/*.ts'
  ]

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    /**
     * 1 - Transpile all TypeScript sources to ES6.
     */
    ts: {
      lib: {
        src: SOURCE_FILES,
        outDir: '_build/es6',
        options: {
          target: 'es6',
          comments: true,
          declaration: true,
          additionalFlags: '--moduleResolution node'
        }
      }
    },

    /**
     * 2 - Transpile the ES6 sources to ES5.
     */
    babel: {
      lib: {
        options: {
          sourceMap: true
        },
        files: [{
          expand: true,
          cwd: '_build/es6',
          src: ['**/*.js'],
          dest: '_build/es5'
        }]
      }
    },

    /**
     * Create a bundle of the library and dependencies for in-browser
     * testing.
     */
    
      // 3 - Bundle the ES5 sources to a single file, exlucding 3rd
      // party dependencies
      browserify: {
        files: {
          '_build/bundle.js' : [ '_build/es5/**/*.js' ]
        },
        options: {
          exclude: [ 'hyperquest', 'querystring', 'URIjs', 'bluebird' ]
        }
      }

    /**
     * Create a minified version for distribution.
     */
    uglify: {
      dist: {
        options: {
          sourceMap: true
        },
        files: {
          'dist/bundle.min.js' : '_build/bundle.js'
        }
      }
    },

    watch: {
      lib: {
        files: SOURCE_FILES,
        tasks: ['lib']
      }
    },

    clean: [
      'dist', '_build'
    ]

  })

  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-babel')
  grunt.loadNpmTasks('grunt-browserify')
  grunt.loadNpmTasks('grunt-ts')

  grunt.registerTask('lib', [
    'ts', 'babel'
  ])

  grunt.registerTask('dist', [
    'lib', 'browserify', 'uglify:dist' 
  ])

  grunt.registerTask('default', [
    'lib'
  ])
}
