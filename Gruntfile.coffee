module.exports = (grunt) ->
	grunt.initConfig
		pkg: grunt.file.readJSON("package.json") 
		path: require "path"


		# list our available tasks
		availabletasks:
			tasks:
				options:
					filter: "include", 
					tasks: [ 
						"serve-dev"
					]
					descriptions:
						"serve-dev": "Boots up server and opens your default browser"


		# runs tasks concurrently				
		concurrent:
			dev: [
				"nodemon:dev",
				"watch"
			]
			options:
				logConcurrentOutput: true


		# boots up nodemon
		nodemon:
			dev:
				scripts: "bin<%= path.sep %>www"
				options:
					env: { 
						"NODE_ENV": "dev" 
					}
					# watch: [
					# 	"public"						
					# ] 
					# ignore: [
					# 	"client/public/*", 
					# 	".git/*", 
					# 	"*.jade", 
					# 	"node_modules/*"
					# ],					
					delay: 300
					callback: (nodemon) ->

						nodemon.on "log", (event) ->
							console.log event.colour
                        
						nodemon.on "config:update", ->
							setTimeout ->
								require("open") "http://localhost:3000"
							, 1000

						nodemon.on "restart", -> 
							setTimeout ->
								require("fs").writeFileSync(".rebooted", "rebooted")
							, 1000


		# wire bower dependencies
		wiredep:
			tasks: 
				directory: "bower_components"
				src: [
					"views<%= path.sep %>layout.jade"
				]
				cwd: './'
				exclude: [
					"bin/materialize.css"
				]
				ignorePath: /^(\.\.\/\.\.\/)/


		# compile sass to css
		sass:
			dev:
				options:  
					compress: false 
				files: [
					"public<%= path.sep %>css<%= path.sep %>app.css" : "sass<%= path.sep %>materialize.scss",
				]


		# # compress our javascript			
		# uglify:
		# 	dev:
		# 		options:
		# 			beautify: true
		# 		files:
		# 			"public" : ["src<%= path.sep %>**<%= path.sep %>*.js"]

			# build:
			# 	options:
			# 		beautify: false
			# 	files:
			# 		"public<%= path.sep %>js<%= path.sep %>app.min.js" : [
			# 			'public' + '<%= path.sep %>js<%= path.sep %>*.js'
			# 			'!public' + '<%= path.sep %>js<%= path.sep %>app.min.js'
			# 			'!public' + '<%= path.sep %>js<%= path.sep %>lib.js'
			# 			'!public' + '<%= path.sep %>js<%= path.sep %>lib.min.js'
			# 			#'!public' + '<%= path.sep %>js<%= path.sep %>app-my-bench.js'
						
			# 		],					
			# 		"public<%= path.sep %>js<%= path.sep %>lib.min.js" : 'public' + '<%= path.sep %>js<%= path.sep %>lib.js'


		# watches files and runs tasks when the files change
		watch:
			options:
				livereload: true

			sassfiles:
				files: [
					"sass<%= path.sep %>**<%= path.sep %>*.scss"
				]
				tasks: ['sass:dev']
				options:
					spawn: false

			jadefiles:
				files: [
					"views<%= path.sep %>**<%= path.sep %>*.jade"
				]
				options:
					spawn: false

			jsfiles:
				files: [
					"public<%= path.sep %>js<%= path.sep %>**<%= path.sep %>*.js"
				]					
				# tasks: [
				# 	'uglify:dev'
				# ]
				options:
					spawn: false

			# images:
			# 	files: ['src<%= path.sep %>images<%= path.sep %>**<%= path.sep %>*.*']
			# 	tasks: ['clean:images', 'copy:images']
			# 	#tasks: if config.env == 'dev' then ["clean:images", "copy:images"]
			# 	options:
			# 		spawn: false

			# jsfiles:
			# 	files: [
			# 		"routes<%= path.sep %>**<%= path.sep %>*.js",
   			#                  "config.js",
   			#                  "app-config.js"					
			# 	]
			# 	options:
			# 		spawn: false

			# jsassets:
			# 	files: [
			# 		"src<%= path.sep %>js<%= path.sep %>*.js", 
			# 		"lib<%= path.sep %>**<%= path.sep %>*.js",
			# 	]
			# 	tasks: ['uglify:dev']
			# 	options:
			# 		spawn: false

			# mastercss:
			# 	files: ["src<%= path.sep %>css<%= path.sep %>*.css"]
			# 	tasks: ["cssmin:build"]
			# 	options:
			# 		spawn: false				


		# # automagically prefix our css
		# postcss:
		# 	options:
		# 		map: false,
		# 		processors: [
		# 			require('pixrem')(), # add fallbacks for rem units
  #       			require('autoprefixer')({browsers: ['last 2 versions']}), # add vendor prefixes
  #       		]
		# 	dist:
		# 		src: ['public<%= path.sep %>css/*.css', '!public<%= path.sep %>css<%= path.sep %>app.min.css'] 
		# 	vet:
		# 		src: ['.tmp<%= path.sep %>css/**/*.css'] 


		# # [incomplete] helps us test on multiple browsers and devices
		# browserSync:
		# 	dev: 
		# 		bsFiles:
		# 			src: 'public<%= path.sep %>**'
		# 		options:
		# 			server:
		# 				baseDir: 'server.js' 


		# # sets our environment from development to distribution
		# 'string-replace': 
		# 	dev:
		# 		files:
		# 			'config.js' : 'config.js'
		# 		options:
		# 			replacements: [{
		# 				pattern: "var env = 'build';" 
		# 				replacement: "var env = 'dev';"
		# 			}]
		# 	build:
		# 		files:
		# 			'config.js' : 'config.js'
		# 		options:
		# 			replacements: [{
		# 				pattern: "var env = 'dev';" 
		# 				replacement: "var env = 'build';"
		# 			}]


		# # cleans folders for us
		# clean:
		# 	images:
		# 		src: ['public<%= path.sep %>images']
		# 	css:
		# 		src: ['public<%= path.sep %>css']
		# 	js:
		# 		src: ['public<%= path.sep %>js']
		# 	tmp:
		# 		src: ['.tmp']
		# 	all:
		# 		src: [
		# 			'public<%= path.sep %>css'
		# 			'public<%= path.sep %>images'
		# 			'public<%= path.sep %>js'
		# 		]


		# # copies image files for us
		# copy:
		# 	options: {
		# 		processContentExclude: ['**<%= path.sep %>*.{png,gif,jpg,ico}']
		# 	}
		# 	images:
		# 		files: [{
		# 			expand: true
		# 			cwd: 'src<%= path.sep %>images<%= path.sep %>'
		# 			src: ['**<%= path.sep %>*.{png,jpg,gif,ico}'] 
		# 			dest: 'public<%= path.sep %>images<%= path.sep %>'  
		# 		}] 


		# # compresses our images for distribution
		# imagemin: 
		# 	build:
		# 		options:
		# 			cache: true
		# 			optimizationLevel: 3
		# 		files: [{
		# 			expand: true
		# 			cwd: 'src<%= path.sep %>images<%= path.sep %>'
		# 			src: ['**<%= path.sep %>*.{png,jpg,gif,ico,pxm}'] 
		# 			dest: 'public<%= path.sep %>images<%= path.sep %>'
		# 		}]                   



                            

		# # compiles less files to css
		# less:
		# 	vet:
		# 		options:
		# 			compress: false
		# 		files: [{
		# 			expand: true
		# 			cwd: 'src<%= path.sep %>less<%= path.sep %>'
		# 			src: ['css<%= path.sep %>*.less']
		# 			ext: '.css'
		# 			extDot: 'first'
		# 			dest: '.tmp<%= path.sep %>css<%= path.sep %>'  
		# 		}]

		# 	dev:
		# 		options:  
		# 			compress: false
		# 		files: 
		# 			"public<%= config.globalCss[1] %>" : "src<%= path.sep %>less<%= path.sep %>bootstrap.less",
		# 			"public<%= config.routes.advertising.css %>" : config.routes.advertising.styleAssets, 
		# 			"public<%= config.routes.askAQuestion.css %>" : config.routes.askAQuestion.styleAssets, 
		# 			"public<%= config.routes.categories.css %>" : config.routes.categories.styleAssets, 
		# 			"public<%= config.routes.equipmentList.css %>" : config.routes.equipmentList.styleAssets, 
		# 			"public<%= config.routes.equipmentResults.css %>" : config.routes.equipmentResults.styleAssets, 
		# 			"public<%= config.routes.equipment.css %>" : config.routes.equipment.styleAssets, 
		# 			"public<%= config.routes.index.css %>" : config.routes.index.styleAssets, 
		# 			"public<%= config.routes.inquirySubmitted.css %>" : config.routes.inquirySubmitted.styleAssets, 
		# 			"public<%= config.routes.manufacturer.css %>" : config.routes.manufacturer.styleAssets, 
		# 			"public<%= config.routes.manufacturers.css %>" : config.routes.manufacturers.styleAssets, 
		# 			"public<%= config.routes.myCommunityFeed.css %>" : config.routes.myCommunityFeed.styleAssets, 
		# 			"public<%= config.routes.myDiscussions.css %>" : config.routes.myDiscussions.styleAssets, 
		# 			"public<%= config.routes.myItems.css %>" : config.routes.myItems.styleAssets, 
		# 			"public<%= config.routes.pressReleases.css %>" : config.routes.pressReleases.styleAssets, 
		# 			"public<%= config.routes.privacyPolicy.css %>" : config.routes.privacyPolicy.styleAssets, 
		# 			"public<%= config.routes.questionsAndAnswers.css %>" : config.routes.questionsAndAnswers.styleAssets, 
		# 			"public<%= config.routes.register.css %>" : config.routes.register.styleAssets
		# 			"public<%= config.routes.requestAQuote.css %>" : config.routes.requestAQuote.styleAssets, 
		# 			"public<%= config.routes.signIn.css %>" : config.routes.signIn.styleAssets, 
		# 			"public<%= config.routes.signOut.css %>" : config.routes.signOut.styleAssets, 
		# 			"public<%= config.routes.termsAndConditions.css %>" : config.routes.termsAndConditions.styleAssets, 
		# 			"public<%= config.routes.thread.css %>" : config.routes.thread.styleAssets, 
		# 			"public<%= config.routes.welcome.css %>" : config.routes.welcome.styleAssets, 
		# 			"public<%= config.routes.writeAReview.css %>" : config.routes.writeAReview.styleAssets



						

		# # creates release branch
		# create_release_branch:
		# 	options:
		# 		versionPrefix: "v"
		# 		readme: "CHANGELOG.md"
		# 		package: "package.json"
		# 		version: "VERSION"
		# 		git:
		# 			sourceBranch: "master"
		# 			newBranchPrefix: "Release-"
		# 			autoCommitUpdatedVersionFiles: true
		# 			autoCommitMessage: "Updated Version Numbers"
		# 		readmeRegExReplacePattern: "(Change\\sLog[\\n\\r]{1,}={3,}[\\r\\n]{1,})"
		# 	major:
		# 		options:
		# 			git:
		# 				newBranchPrefix: "Major-"
		# 	minor:
		# 		options:
		# 			git:
		# 				newBranchPrefix: "Release-"
		# 	patch:
		# 		options:
		# 			git:
		# 				newBranchPrefix: "Patch-"


		# # sends a message to slack chat
		# slack:
		# 	options:
		# 		endpoint: "https://hooks.slack.com/services/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"
		# 		channel: "#devteam"
		# 	newReleaseBranch:
		# 		text: "A new Release Branch (`Release-<%= version %>`) has been Created for `<%= pkg.name %>`"
		# 	newPatchBranch:
		# 		text: "A new Patch Branch (`Patch-<%= version %>`) has been Created for `<%= pkg.name %>`"


		# # updates version file
		# updateVersionInFile:
		# 	server:
		# 		options:
		# 			file: "server.js"


		# # is this being used
		# jshint:
		# 	options:
		# 		globals:
		# 			jQuery: true
		# 			console: true
		# 			module: true
		# 			options:
		# 				reporter: require("jshint-stylish")
		# 	gruntfile:
		# 		src: ["gruntfile.js"]
		# 	sourceFiles:
		# 		src: ["src<%= path.sep %>js<%= path.sep %>*.js"]


		# # lint our css files
		# csslint:
		# 	tmp:
		# 		options:
		# 			import: 2
		# 			csslintrc: '.csslintrc'
		# 		src: [
		# 			'.tmp<%= path.sep %>css<%= path.sep %>**<%= path.sep %>*.css'
		# 			'!.tmp<%= path.sep %>css<%= path.sep %>bootstrap.css'
		# 			'!.tmp<%= path.sep %>css<%= path.sep %>css<%= path.sep %>owl-theme.css'
		# 			'!.tmp<%= path.sep %>css<%= path.sep %>css<%= path.sep %>owl-carousel.css'
		# 			'!.tmp<%= path.sep %>css<%= path.sep %>css<%= path.sep %>jquery-filestyle.css'
		# 			'!.tmp<%= path.sep %>css<%= path.sep %>css<%= path.sep %>jquery-ui.css'
		# 		]


		# # compress our css files		
		# cssmin:
		# 	build:
		# 		files:
		# 			"public<%= path.sep %>css<%= path.sep %>app.min.css": [
		# 				'public' + '<%= path.sep %>css<%= path.sep %>*.css'
		# 				'!public' + '<%= path.sep %>css<%= path.sep %>app.min.css'
		# 			]					


	# require our tasks
	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt); 
	# grunt.loadNpmTasks "grunt-string-replace"


	# register our grunt tasks
	# grunt.registerTask("createMajorBranch", ["create_release_branch:major", "updateVersionInFile:server", "slack:newReleaseBranch"])
	# grunt.registerTask("createMinorBranch", ["create_release_branch:minor", "updateVersionInFile:server", "slack:newReleaseBranch"])
	# grunt.registerTask("createPatchBranch", ["create_release_branch:patch", "updateVersionInFile:server", "slack:newPatchBranch"])
	# grunt.registerTask("build", ["clean:tmp", "string-replace:build", "postcss:dist", "cssmin:build", "uglify:build", "imagemin:build", "concurrent:build"])
	# grunt.registerTask("run", ["string-replace:dev", "less:dev", "uglify:dev", "concurrent:dev"])
	# grunt.registerTask("dev", ["string-replace:dev", "less:dev", "uglify:dev", "concurrent:backend"])
	# grunt.registerTask("vetcss", ["clean:tmp", "less:vet", "postcss:vet", "csslint:tmp"])
	grunt.registerTask("default", ["availabletasks"])
	grunt.registerTask("serve-dev", ["wiredep", "sass:dev", "concurrent:dev"])
	


	# register multi tasks
	grunt.registerMultiTask "updateVersionInFile", ->
		pkg = grunt.file.readJSON("package.json")
		_options = @.options()

		contents = ""
		if ( grunt.file.exists(_options.file) )
			grunt.log.writeln("Update Version in File [" +_options.file+ "] to: " + pkg.version )
			contents = grunt.file.read(_options.file)
			contents = contents.replace(/versionNo\s=\s["']v?[0-9]\.[0-9]\.[0-9]["']/gi, "versionNo = '"+pkg.version+"'")
			grunt.file.write(_options.file, contents)
			grunt.config.set("version", pkg.version)
		else
			grunt.fail.warn "Couldnt Find File: " + _options.file