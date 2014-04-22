module.exports = function(grunt) {

    grunt.initConfig({
        paths: {
            scss: './assets/scss',
            css: './assets/css'
        },
        buildType: 'Build',
        pkg: grunt.file.readJSON('package.json'),
        archive_name: grunt.option('name') || 'linen',

        clean: {
            pre: ['dist/', 'build/'],
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
            'assets/js/build.js': [
                'assets/vendor/foundation/js/foundation.js',
                'assets/js/jquery.fitvids.js',
                'assets/js/index.js'
            ],
            'jquery.min.js': [
                'assets/vendor/jquery/dist/jquery/min.js'
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
            admin: {
                options : {
                    // Only enable sourcemaps if you have Sass 3.3 installed.
                    // sourcemap: true
                },
                files: {
                    '<%= paths.css %>/screen.css': '<%= paths.scss %>/app.scss'
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
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat', 'sass:admin']);
    grunt.registerTask('bundle', ['concat', 'clean:pre', 'copy:main', 'compress', 'copy:archive', 'clean:post']);
};