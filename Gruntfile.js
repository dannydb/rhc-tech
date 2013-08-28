// This is the main application configuration file. It is a Grunt
// configuration file, which you can learn more about here:
// https://github.com/cowboy/grunt/blob/master/docs/configuring.md
/*jslint nomen: true*/
'use strict';
module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        // The clean task ensures the entire XXX folder is removed
        clean: {
            development: ['_site']
        },

        // Run Jekyll
        jekyll: {
            exclude: ['node_modules', 'bower_components', 'assets/_less'],
            dest: './_site'
        },

        // Compile specified less files
        recess: {
            options: {
                compile: true
            },
            bootstrap: {
                src: ['assets/_less/application.less'],
                dest: 'assets/css/application.css'
            }
        },

        // Concatenate JS

        concat: {
          application: {
            src: [
              'bower_components/todomvc-common/base.js',
              'bower_components/jquery/jquery.min.js',
              'bower_components/bootstrap/js/transition.js',
              'bower_components/bootstrap/js/alert.js',
              'bower_components/bootstrap/js/button.js',
              'bower_components/bootstrap/js/carousel.js',
              'bower_components/bootstrap/js/collapse.js',
              'bower_components/bootstrap/js/dropdown.js',
              'bower_components/bootstrap/js/modal.js',
              'bower_components/bootstrap/js/tooltip.js',
              'bower_components/bootstrap/js/popover.js',
              'bower_components/bootstrap/js/scrollspy.js',
              'bower_components/bootstrap/js/tab.js',
              'bower_components/bootstrap/js/affix.js',
              'bower_components/underscore/underscore-min.js',
              'bower_components/backbone/backbone-min.js',
              'bower_components/backbone.localStorage/backbone.localStorage-min.js',
              'assets/js/models/todo.js',
              'assets/js/collections/todos.js',
              'assets/js/views/todo-view.js',
              'assets/js/views/app-view.js',
              'assets/js/routers/router.js',
              'assets/js/app.js'

              
            ],
            dest: 'assets/js/application.js'
          }
        },

        // Automatically run a task when a file changes
        watch: {
            jekyll: {
                files: [
                    '_layouts/*',
                    '_posts/*',
                    '_includes/*',
                    '_config.yml',
                    'index.html',
                    '/*.html'
                ],
                tasks: ['jekyll', 'concurrent:server']
            },
            recess: {
                files: [
                    'assets/_less/*.less',
                    'bower_components/bootstrap/less/*.less',
                    'bower_components/todomvc-common/base.less'
                ],
                tasks: ['recess:bootstrap', 'shell:copyCss']
            }
        },

        // Run watch tasks concurrently
        concurrent: {
            watch: {
                tasks: ['watch:jekyll', 'watch:recess', 'shell:liveStyle']
            },
            server: {
                tasks: ['shell:liveStyle']
            },
            options: {
                logConcurrentOutput: true
            }
        },

        // Copy css when watch recompiles
        shell: {
            copyCss: {
                command: 'cp assets/css/application.css _site/assets/css/application.css'
            },
            liveStyle: {
                command: 'cd _site; livestyle '
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-jekyll');
    grunt.loadNpmTasks('grunt-shell');

    // The default task will show the usage
    grunt.registerTask('default', 'Prints usage', function () {
        grunt.log.writeln('');
        grunt.log.writeln('Product site development');
        grunt.log.writeln('------------------------');
        grunt.log.writeln('');
        grunt.log.writeln('* run "grunt --help" to get an overview of all commands.');
        grunt.log.writeln('* run "grunt dev"" to start developing.');
    });

    // The dev task will be used during development
    grunt.registerTask('dev', ['clean:development', 'recess:bootstrap', 'concat', 'jekyll', 'concurrent:watch', 'concurrent:server']);
};