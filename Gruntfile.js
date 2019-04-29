const sass = require('node-sass')
module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt)

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'private/js/',
                        src: ['*.js'],
                        dest: 'grunt/js'
                    }
                ]
            }
        },

        uglify: {
            build: {
                src: 'grunt/js/*.js',
                dest: 'public/js/script.js'
            }
        },

        sass: {
            options: {
                implementation: sass,
                sourceMap: true
            },
            dist: {
                files: {
                    'grunt/css/main.css': 'private/sass/main.sass'
                }
            }
        },

        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'public/css/main.css': 'grunt/css/main.css'
                }
            }
        },

        watch: {
            scripts: {
                files: ['private/sass/*', 'private/js/*'],
                tasks: ['sass', 'babel', 'uglify', 'cssmin'],
                options: {
                    spawn: false,
                },
            },
        }
    })

    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-cssmin')
    grunt.loadNpmTasks('grunt-contrib-watch')

    grunt.registerTask('default', ['babel', 'uglify', 'sass', 'cssmin'])
}
