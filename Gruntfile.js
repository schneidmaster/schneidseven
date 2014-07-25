module.exports = function(grunt) {

    grunt.initConfig({
        paths: {
            scss: './assets/scss',
            built: './assets/built'
        },
        buildType: 'Build',
        pkg: grunt.file.readJSON('package.json'),
        archive_name: grunt.option('name') || 'schneidseven',

        clean: {
            pre: ['build/'],
            post: ['<%= archive_name %>.zip']
        },

        compress: {
            main: {
                options: {
                    archive: '<%= archive_name %>.zip'
                },
                expand: true,
                cwd: 'build/',
                src: ['**/*'],
                dest: ''
            }
        },

        concat: {
            '<%= paths.built %>/schneidseven.js': [
                'assets/vendor/jquery/dist/jquery.js',
                'assets/vendor/foundation/js/foundation.js',
                'assets/vendor/highlightjs/highlight.pack.js',
                'assets/js/jquery.fitvids.js',
                'assets/js/index.js'
            ]
        },

        copy: {
            main: {
                files: [
                    {expand: true, src: ['assets/css/**'], dest: 'build/'},
                    {expand: true, src: ['assets/fonts/**'], dest: 'build/'},
                    {expand: true, src: ['assets/images/**'], dest: 'build/'},
                    {expand: true, src: ['assets/js/**'], dest: 'build/'},
                    {expand: true, src: ['partials/**'], dest: 'build/'},
                    {expand: true, src: ['scss/**'], dest: 'build/'},
                    {expand: true, src: ['*', '!.gitignore', '!.DS_Store'], dest: 'build/'}
                ]
            },
            archive: {
                files: [
                    {expand: true, src: ['<%= archive_name %>.zip'], dest: 'dist/'}
                ]
            }
        },

        cssmin: {
            build: {
                files: {
                    '<%= paths.built %>/style.min.css': [
                        '<%= paths.built %>/style.css',
                        'assets/vendor/highlightjs/styles/github.css'
                    ]
                }
            }
        },

        sass: {
            build: {
                files: {
                    '<%= paths.built %>/style.css': '<%= paths.scss %>/app.scss'
                }
            }
        },

        // command line tools
        shell: {
            bower: {
                command: './node_modules/bower/bin/bower install',
                options: {
                    stdout: true
                }
            }
        },

        // minify javascript file for production
        uglify: {
            build: {
                files: {
                    '<%= paths.built %>/schneidseven.min.js': '<%= paths.built %>/schneidseven.js'
                }
            }
        },

        watch: {
            sass: {
                files: './scss/**/*.scss',
                tasks: ['sass:admin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('default', ['shell:bower', 'sass', 'concat']);
    grunt.registerTask('prod', ['shell:bower', 'concat', 'sass', 'uglify', 'cssmin']);
    grunt.registerTask('bundle', ['shell:bower', 'concat', 'sass', 'uglify', 'clean:pre', 'copy:main', 'compress', 'copy:archive', 'clean:post']);
};