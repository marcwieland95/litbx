module.exports = function(grunt){

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		/**
		 * Define structure paths
		 */
		paths: {
			'bower': 'bower_components',
			'dist': 'dist',
			'src': 'src'
		},

		banner: '/*!\n' +
				' * <%= pkg.name %>\n' +
				' * Version: <%= pkg.version %>\n' +
				' * <%= pkg.description %>\n' +
				' * Author: <%= pkg.author %>\n' +
				' * Site: http://<%= pkg.homepage %>/\n' +
				' * Licensed under the MIT license\n' +
				' */\n' +
				'',

		jshint: {
			src: {
				options: {
					'-W099': true,
					expr: true
				},
				src: [
					'Gruntfile.js',
					'<%= paths.src %>/**/*.js'
				]
			}
		},

		/**
		 * Merege all scripts into one file
		 * Warp concated files inside self-invoking anonymous function
		 */
		concat: {
			options: {
				separator: ';',
				banner: '<%= banner %>\n' +
						';(function($, window, document, undefined){\n' +
						'',
				footer: '\n})(jQuery, window, document);'
			},
			dist: {
				files: {
					'<%= paths.dist %>/litbx.js': [
						'<%= paths.src %>/modules/*.js',
						'<%= paths.src %>/*.js'
					]
				}
			}
		},

		/**
		 * Minify concated files
		 */
		uglify: {
			dist: {
				options: {
					report: 'min',
					banner: '<%= banner %>',
					sourceMap: true,
				},
				files: [{
					'<%= paths.dist %>/litbx.min.js': [
						'<%= paths.dist %>/litbx.js'
					]
				}],
			}
		},

		/**
		 * Compile Less styles
		 */
		less: {
			options: {
				paths: [
					"<%= paths.bower %>/",
				]
			},
			normal: {
				files: {
					"<%= paths.dist %>/css/litbx.core.css": '<%= paths.src %>/less/litbx.core.less',
					"<%= paths.dist %>/css/litbx.theme.css": '<%= paths.src %>/less/litbx.theme.less',
				}
			},
			min: {
				options: {
					compress: true,
					report: 'min'
				},
				files: {
					"<%= paths.dist %>/css/litbx.core.min.css": '<%= paths.src %>/less/litbx.core.less',
					"<%= paths.dist %>/css/litbx.theme.min.css": '<%= paths.src %>/less/litbx.theme.less',
				}
			}
		},

		/**
		 * Conver LESS to SASS
		 */
		lessToSass: {
			convert: {
				files: {
					"<%= paths.src %>/sass/litbx.core.scss": '<%= paths.src %>/less/litbx.core.less',
					"<%= paths.src %>/sass/litbx.theme.scss": '<%= paths.src %>/less/litbx.theme.less',
				}
			}
		},

		/**
		 * Autoprefixer
		 * autoprefix CSS3
		 */
		autoprefixer: {
			dist: {
				files: {
					'<%= paths.dist %>/css/litbx.core.css': '<%= paths.dist %>/css/litbx.core.css',
					'<%= paths.dist %>/css/litbx.core.min.css': '<%= paths.dist %>/css/litbx.core.min.css',
					'<%= paths.dist %>/css/litbx.theme.css': '<%= paths.dist %>/css/litbx.theme.css',
					'<%= paths.dist %>/css/litbx.theme.min.css': '<%= paths.dist %>/css/litbx.theme.min.css'
				}
			 }
		},

		/**
		 * Set watch
		 */
		watch: {
			css: {
				files: ['<%= paths.src %>/**/*.{css,less,sass,scss}'],
				tasks: ['style']
			},
			js: {
				files: ['<%= paths.src %>/**/*.js'],
				tasks: ['script']
			}
		}
	});

	/**
	 * Register grunt tasks
	 */
	grunt.registerTask('default', [
		'style', 'script', 'watch'
	]);

	grunt.registerTask('style', [
		'less', 'lessToSass', 'autoprefixer'
	]);

	grunt.registerTask('script', [
		'jshint',
		'concat', 'uglify',
	]);

	grunt.registerTask('test', [
		'jshint'
	]);

};
