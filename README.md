# **grunt workflow / development folder**

This repository will download the custom Gruntfile.js, package.json, .gitignore and `/dev` folder.

When running, it will render the final files inside `/assets/themes/themename/_/`

## Installation

1. **Install Project Dependencies**

        npm install grunt --save-dev
        npm install grunt-contrib-watch --save-dev
        npm install grunt-browser-sync --save-dev
        npm install grunt-contrib-jshint --save-dev
        npm install jshint-stylish --save-dev
        npm install grunt-contrib-concat --save-dev
        npm install grunt-contrib-uglify --save-dev
        npm install grunt-contrib-sass --save-dev
        npm install grunt-contrib-imagemin --save-dev
        npm install grunt-svgmin --save-dev
        npm install grunt-svgstore --save-dev
        npm install load-grunt-tasks --save-dev
        npm install time-grunt --save-dev
        npm install grunt-newer --save-dev
        npm install grunt-contrib-copy --save-dev
        npm install grunt-contrib-clean --save-dev
        npm install grunt-rsync-2 --save-dev

    **If dependencies are already in package.json**

        npm install  


2. **Gem Dependencies**

        gem install image_optim  


3. **Grunt configuration**

    **Open Gruntfile.js and edit this variables:**

    - `theme` to your WP theme name.
    - `themeFolder` Two options here, leave the first line to work with Wordpress or the second to work with HTML templates

    **Optional config if you want to deploy with grunt**

    - `proHost:          'hostname or IP'`
    - `proUser:          'username'`
    - `proRemoteBase:    '~/www'`
    - `devHost:          'hostname or IP'`
    - `devUser:          'username'`
    - `devRemoteBase:    '~/www'`

## How it works

### Grunt

Grunt tasks:

1. **Run `grunt`** to watch file changes (styles, js or images) and run dev tasks

    - Preprocess SASS
    - JSHint, concat and uglify js
    - Optimize images (jpg, png, svg)
    - Copy tmp images
    - Live reload browser

2. **Run `grunt dist`** to create a final version for revision
3. **Run `grunt deploy-dev`** to create a final version and upload it to development server (if configured before)
4. **Run `grunt deploy-dist`** to create a final version and upload it to production server

**IMPORTANT**

Before deploying you must add your ssh key to the hosting or server. [Instructions here](http://coolestguidesontheplanet.com/make-passwordless-ssh-connection-osx-10-9-mavericks-linux/)

### SASS
SASS basic structure included based on:
    - HTML5 Boilerplate v4.3.0
    - Normalize.css v1.1.3

### Deployment
We use [dandelion](https://github.com/scttnlsn/dandelion) to deploy. `gem install dandelion`. Which is way similar to other CVS-to-everywhere deployement systems such as git-ftp, with some advantadges like a simple .yml file for deployement settings.

Dandelion writes a file called `.revision` in the folder you are deploying to, and uploads the difference between your last commit and the one informed in the revision file.

There are two config files for this project:
    - dandelion.yml, for development deployements
    - dandelion-production.yml, for production deployements

No additional settings needed, if you have your key in the server you will upload content smoothly.

run `dandelion deploy` from project root to deploy your last commit to staging.
run `dandelion --config=dandelion-production.yml deploy` from project root to deploy your last commit to staging.

For a safer development follow this simple steps:
    - Always push your changes to the remote repo before deploy
    - Always run a deploy test by adding `--dry-run` at the end of the command (`dandelion deploy --dry-run`) to preview which files will be deployed.
    - Always run `dandelion deploy` (staging) before `dandelion --config=dandelion-production.yml deploy` (production)

:fire: *There is no rollback option other than checking out a previous commit* and push it again. Dandelion relies strongly in your git skills.

Also, keep in mind that dandalion will release YOUR last commit, not HEAD's one. Dandelion will not deploy ignored files in .gitigore.

### Wordpress installation
http://yeoman.io/
https://github.com/wesleytodd/YeoPress

`yo wordpress`


### Wordpress plugin installation
http://wp-cli.org/

    wp plugin install akismet --activate
    wp plugin install wordpress-seo --activate
    wp plugin install wordfence
    wp plugin install wp-super-cache
    wp plugin install backwpup
    wp plugin install ewww-image-optimizer --activate
    wp plugin install https://connect.advancedcustomfields.com/index.php?p=pro&a=download&k=b3JkZXJfaWQ9MzI5NDZ8dHlwZT1kZXZlbG9wZXJ8ZGF0ZT0yMDE0LTA3LTA3IDE1OjU2OjIx --activate


### Wordpress theme installation
https://github.com/automattic/_s

    wp theme install https://github.com/Automattic/_s/archive/master.zip --activate


## References

  - http://www.integralist.co.uk/Grunt-Boilerplate.html
  - http://gruntjs.com/frequently-asked-questions#globals-and-configs
  - http://24ways.org/2013/grunt-is-not-weird-and-hard/
  - http://mattbanks.me/grunt-wordpress-development-deployments/
  - http://davidtucker.net/articles/automating-with-grunt/
  - http://benfrain.com/image-sprites-data-uris-icon-fonts-v-svgs/
