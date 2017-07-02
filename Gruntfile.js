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

        copy: {
            build: {
                src:     'source/logger.js',
                dest:    'js-logger.js',
                options: {
                    process: function (content, srcpath) {
                        return _banner + content;
                    },
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
                    src:    'source/logger.js',
                    dest:   'js-logger.min.js'
                }]
            }
        },

    };

    grunt.initConfig(_config);

    // load the tasks
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-uglify");

    // define the tasks
    grunt.registerTask('build', 'Build js-logger.', [
        'clean:build',
        'copy:build',
        'uglify:build'
    ]);
};