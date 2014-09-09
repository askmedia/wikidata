'use strict';

module.exports = function(grunt)
{
  grunt.initConfig
  ({
      
    // Metadata
    
    pkg: grunt.file.readJSON('package.json'),
  
    // Task configuration
    
    clean: {
      files: ['dist']
    },
    
    closurecompiler: {
      minify: {
        files: {
            "dist/jquery.swinxytouch.min.js": [
                "src/touch.js",
                "src/gesture-doubletap.js",
                "src/gesture-drag.js",
                "src/gesture-longpress.js",
                "src/gesture-rotate.js",
                "src/gesture-scale.js",
                "src/gesture-swipe.js",
                "src/gesture-tap.js",
                "src/helper-bound.js",
                "src/helper-smartclick.js"
            ]
        },
        options: {
            "compilation_level": "SIMPLE_OPTIMIZATIONS"
        }
      }    
    }
    
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-closurecompiler');

  // Tasks
  grunt.registerTask('minify', ['closurecompiler:minify']);
  grunt.registerTask('default', ['closurecompiler:minify']);

};
