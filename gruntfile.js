'use strict';

module.exports = function(grunt) {

	require('time-grunt')(grunt);

    grunt.initConfig({
        // task config ---------------------------------------------
        watch: {
            options: {
                livereload: true
            },
            change: {
                files: [
                    'dev/**/*',
                    'gruntfile.js',
                ],
                tasks: ['build']
            }
        },

        clean: {
            build: ['prod']
        },

        requirejs: {
            dist: {

                // Options : https ://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    baseUrl: './',
                    shim: {
                        bootstrap: {
                            deps: ['jquery'],
                            exports: 'bootstrap'
                        }
                    },
                    paths: {
                        'bootstrap': 'bower_modules/sass-bootstrap/dist/js/bootstrap',
                        'jquery': 'bower_modules/jquery/jquery'
                    },
                    name: 'dev/js/main.js',
                    out: 'prod/js/main.min.js',
                    // name : 'bower_modules/almond/almond',
                    almond: true,
                    wrap: true,
                    optimize: 'none',
                    preserveLicenseComments: false,
                    useStrict: true,
                    findNestedDependencies: true
                }
            }
        },

        copy: {
            fonts: {
                files: [{
                    expand: true,
                    cwd: 'dev',
                    src: ['fonts/**', ],
                    dest: 'prod/'
                }, ]
            },
            img: {
                files: [{
                    expand: true,
                    cwd: 'dev',
                    src: ['img/**', ],
                    dest: 'prod/'
                }, ]
            },
            html: {
                files: [{
                    expand: true,
                    cwd: 'dev/html',
                    src: ['**', ],
                    dest: 'prod/'
                }, ]
            }
        },

        cssmin: {
            dist: {
                options: {
                    report: 'min',
                    sourceMap: true
                },
                files: {
                    'prod/css/app.min.css': [
                        'dev/css/carousel.css',
                        'dev/css/bootstrap.css'
                    ],
                }
            }
        }
    });

    // ---------------------------------------------------------
    // Load tasks but filter the grunt-template-jasmine files

    require('matchdep')
        .filterAll('grunt-*')
        .filter(function(task) {
            return task.indexOf('grunt-template-jasmine') === -1;
        })
        .forEach(grunt.loadNpmTasks);

    // ---------------------------------------------------------
    // Register tasks

    grunt.registerTask(
        'build',
        'Build production files to "dest" folder.',
        ['clean', 'copy', 'requirejs', 'cssmin' ]
    );

    grunt.registerTask(
        'default',
        'Watch files and run tests',
        ['watch']
    );
};
