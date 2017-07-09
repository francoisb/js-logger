module.exports = function(grunt) {
    var
        _config,
        _banner = '/* js-logger - https://github.com/francoisb/js-logger */\n';

    _config = {
        clean: {
            build: {
                src: [ 'js-logger.js', 'js-logger.min.js' ]
            }
        },

        concat: {
            build: {
                src:     [
                            'source/module.header.js',
                            'source/logger.js',
                            'source/writers/console.js',
                            'source/module.footer.js',
                         ],
                dest:    'build/js-logger.js',
                options: {
                             stripBanners: true,
                             banner:       _banner,
                         },
            }
        },

        uglify: {
            build: {
                options: {
                    compress: {
                        global_defs: {
                          DEBUG: false
                        },
                        dead_code: true
                    },
                    mangle: {
                        except: []
                    },
                    banner: _banner
                },
                files: [{
                    expand: false,
                    src:    'build/js-logger.js',
                    dest:   'build/js-logger.min.js'
                }]
            }
        },
        jasmine: {
            src: 'build/js-logger.js',
            options: {
                specs:    'tests/*Spec.js',
                template: require('grunt-template-jasmine-nml'),

            }
        }

    };

    grunt.initConfig(_config);

    // load the tasks
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    // define the tasks
    grunt.registerTask('test', 'Run js-logger tests.', [
        'jasmine'
    ]);
    // define the tasks
    grunt.registerTask('build', 'Build js-logger.', [
        'clean:build',
        'concat:build',
        'uglify:build'
    ]);
};