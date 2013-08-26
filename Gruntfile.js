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

        // Automatically run a task when a file changes
        watch: {
            jekyll: {
                files: [
                    '_layouts/*',
                    '_posts/*',
                    '_includes/*',
                    '_config.yml',
                    'index.html'
                ],
                tasks: ['jekyll', 'concurrent:server']
            },
            recess: {
                files: [
                    'assets/_less/*.less',
                    'bower_components/bootstrap/less/*.less'
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
    grunt.registerTask('dev', ['clean:development', 'recess:bootstrap', 'jekyll', 'concurrent:watch', 'concurrent:server']);
};