# grunt-image-pixel-changer

> Crawl all image pixels and convert specified rgba value to another value.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-image-pixel-changer --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-image-pixel-changer');
```

## The "image_pixel_changer" task

### Overview
In your project's Gruntfile, add a section named `image_pixel_changer` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  image_pixel_changer: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options
Refer to examples below, original pixel with RGBA(r1, g1, b1, a1) format will convert to
RGBA(r2, g2, b2, a2). Any omitted option assumes any value is matched.



```js
grunt.initConfig({
  image_pixel_changer: {
    // each pixel equal to RGBA(10, 20, 30, 40) will convert to RGBA(50, 60, 70, 80)
    task1: {
      options: [
        r1: 10,
        g1: 20,
        b1: 30,
        a1: 40,
        r2: 50,
        g2: 60,
        b2: 70,
        a2: 80
      ],
      files: {
        'dest1': 'src1'
      }
    },

    // each pixel equal to RGBA(10, any1, any2, any3) will convert to RGBA(100, 200, no_change, no_change)
    task2: {
      options: [
        r1: 10,
        r2: 100
        g2: 200
      ],
      files: [
        {
          expand: true,
          cwd: '...',
          src: '...',
          dest: '...',
          ext: '...'
        }
      ]
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
