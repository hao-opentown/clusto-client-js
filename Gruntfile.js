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
        outDir: '_build/lib',
        options: {
          target: 'es6',
          comments: true
        }
      }
    },

    /**
     * 2 - Compile the lib sources to a single bundle using
     * browserify, running babeljs over the sources on the way for ES5
     * output.
     */
    browserify: {
      lib: {
        files: {
          '_build/clusto-client.js' : [
            '_build/lib/**/*.js'
          ]
        },
        options: {
          transform: [
            'babelify'
          ],
          browserifyOptions: {
            debug: true
          }
        }
      },
      dep: {
        files: {
          '_build/dependencies.js' : [
            'src/js/dependencies.js'
          ]
        }
      }
    },

    watch: {
      lib: {
        files: SOURCE_FILES,
        tasks: ['lib']
      },
      dep: {
        files: [
          'src/js/dependencies.js'
        ],
        tasks: ['dep']
      }
    }

  })

  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-browserify')
  grunt.loadNpmTasks('grunt-ts-1.5')

  grunt.registerTask('lib', [
    'ts', 'browserify:lib'
  ])

  grunt.registerTask('dep', [
    'browserify:dep'
  ])

  grunt.registerTask('all', [
    'lib', 'dep'
  ])

  grunt.registerTask('default', [
    'all'
  ])
}
