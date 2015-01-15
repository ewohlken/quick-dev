module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        path: {
          root: "/",
          deploy: "/",
          css: "css/",
          scss: "scss/",
          js: "js/",
          html: "views/",
          haml: "views/haml/",
          deployCss: "css/",
          deployJs: "js/",
          host: "alignmenthealthcare.gscadmin.com"
        },
        compass:{
            app: {
                options: {
                    cssDir: '<%= path.css %>',
                    sassDir: '<%= path.scss %>',
                    outputStyle: 'expanded',
                    require: 'sass-globbing',
                    sourcemap: true
                }
            }
        },
        watch: {
            app: {
              options: {
                livereload: true
              },
              files: [
                '**/app.scss',
                '**/app.css',
                '**/app-ie.css',
                '**/app-ie.scss',
                '**/js/app.js'
              ],
              tasks:[
                'app'
              ]
            }
        },
        'ftp-deploy': {
            css: {
              auth: {
                host: '<%= path.host %>',
                port: 21,
                authKey: 'key1'
              },
              src: '<%= path.css %>',
              dest: '<%= path.deployCss %>',
              exclusions: ['<%= path.css %>foundation.css.map', '<%= path.css %>foundation.css']
            },
            all: {
              auth: {
                host: '<%= path.host %>',
                port: 21,
                authKey: 'key1'
              },
              src: '<%= path.root %>',
              dest: '<%= path.deploy %>'
            }

        },
        sprite:{
            all: {
                src: '<%= path.root %>sprites/*.png',
                destImg: '<%= path.root %>images/sprites/sprites.png',
                destCSS: '<%= path.root %>images/sprites/sprites.css'
            }
        },
        haml: {
          compile: {
            files: [ {
              expand: true,
              cwd : '<%= path.haml%>',
              src : ['**/*.haml'],
              dest : '<%= path.html%>',
              ext : '.html'
            } ]
          }
        },
        prettify: {
          options: {
            config: '.prettifyrc'
          },
          html: {
            expand: true,
            cwd: '<%=path.html%>',
            ext: '.html',
            src: ['*.html'],
            dest: '<%=path.html%>'
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ftp-deploy');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-haml');
    grunt.loadNpmTasks('grunt-prettify');

    grunt.registerTask('scss', 'Compiles scss', ['compass:app']);
    grunt.registerTask('app', 'Compiles and Deploys css', ['sass:app','ftp-deploy:css']);
    grunt.registerTask('html', 'Compiles and Prettifies HAML', ['haml','prettify']);

    grunt.registerTask('default', ['watch:app']);
}