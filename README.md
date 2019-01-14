# **grunt workflow / development folder**

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

### SASS
SASS basic structure included based on:
    - HTML5 Boilerplate v4.3.0
    - Normalize.css v1.1.3

## References

  - http://www.integralist.co.uk/Grunt-Boilerplate.html
  - http://gruntjs.com/frequently-asked-questions#globals-and-configs
  - http://24ways.org/2013/grunt-is-not-weird-and-hard/
  - http://mattbanks.me/grunt-wordpress-development-deployments/
  - http://davidtucker.net/articles/automating-with-grunt/
  - http://benfrain.com/image-sprites-data-uris-icon-fonts-v-svgs/
