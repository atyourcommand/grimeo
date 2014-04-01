// JavaScript Document
module.exports = function(grunt) {

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  
  grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	  
	
	/*
	compass: {
		dev: {
			options: {
				sassDir: 'scss',
				cssDir: 'css'
			}
		}
	},
	*/
	/*compass: {
      dist: {
        options: {
          sassDir: 'sass',
          cssDir: 'css',
          outputStyle: 'compressed'
        }
      }
    },
	*/
	/*
	compass: {
      dev: {
        options: {
          config: 'config.rb',
          force: true
        }
      }
    },
	*/
	compass: {
    	dist: {                   
		  options: {             
			//config: 'config/config.rb', 
			sassDir: 'sass',
			cssDir: 'css',
			environment: 'production'
		  }
    	},//not running at the moment
		dev: {
			src: 'sass',
			dest: 'css',
			linecomments: true,
			forcecompile: true,
			//require: [
			//  'animate-sass',
			//  'mylib'
			//],
			//debugsass: true,
			//images: '/path/to/images',
			//relativeassets: true
    	}
	},
	
	concat: {
	  options: {
		separator: ';',
	  },
	  dist: {
		src: ['js/**/*.js'],
		dest: 'main.js', 
		nonull: true,
	  }
	},
	
	uglify: {
	  options: {
		banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
	  },
	  dist: {
		files: {
		  'main.min.js': ['<%= concat.dist.dest %>']
		}
	  }
	},

    watch: {
		css: {
			files: ['sass/**/*.scss'],
			tasks: ['compass']
		},
      
	  /* watch and see if our javascript files change, or new packages are installed */
      js: {
		files: ['main.js', 'js/**/*.js'],
        tasks: ['concat','uglify']
      },
      /* watch our files for change, reload */
      livereload: {
        	//files: ['*.html', 'css/*.css', 'css/*.less', 'images/*', 'scripts/{main.min.js}'],
			files: ['*.html', 'css/*.css', 'sass/*.scss', 'images/*', '{main.min.js}'],
        options: {
          livereload: true
        }
      },
    }, 
	
  });
  
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');     	
  grunt.registerTask('default', 'compass',['watch']);
}