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

        sass: {
            build: {
                files: {
                    '<%= paths.built %>/style.css': '<%= paths.scss %>/app.scss'
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
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat', 'sass']);
    grunt.registerTask('prod', ['concat', 'sass', 'uglify']);
    grunt.registerTask('bundle', ['concat', 'sass', 'uglify', 'clean:pre', 'copy:main', 'compress', 'copy:archive', 'clean:post']);
};