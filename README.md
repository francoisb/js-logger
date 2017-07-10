JS-LOGGER
============

This is a small logger in javascript. With it you can log what you want the way you want you just have to register the writer(s) you need.

To start using it, just download the file in the *build* folder (js-logger.js or js-logger.min.js) and add it to your project as a regular external js file (in that case it will be in the global variable windows['js-logger']), using CommonJS or AMD.

The logger come with a built in writer to be able to log stuff in the console (windows['js-logger'].writers.console as global variable) or 'js-logger/writers/console' as path for CommonJS and AMD.


How to register a writer
-------------------------

A writer is a function with 2 parameters *message* and *options*. The role of a writer is to actually log something somewhere (in the console, using a webservice, ...). 
Each writer have their own severity level below which it will not be trigger;

    // register a writer
    logger.registerWriter('the_writer_name', the_writer, the_level);

An example of a basic logger :

    // a basic writer
    var writer = function(message, options) {
        window.console && console.log && console.log(message);
    };


To see all available severity levels  :

    // all available severity levels
    console.log(logger.levels);


How unregister a writer
-----------------------

    // unregister a writer 
    logger.unregisterWriter('the_writer_name');


How to log something
--------------------

    logger.trace('the_message', options);
    logger.debug('the_message', options);
    logger.info('the_message', options);
    logger.warn('the_message', options);
    logger.error('the_message', options);
    logger.fatal('the_message', options);

Or you can use the log function

    logger.log(the_level, 'the_message', options);


Available options
------------------

You can add all the options you need for your writer.

### Global

*prefix* : To add a prefix to your message (example: "foo" will transform your message into "[foo] the_message")

### Console writer

*additionalData*: To add some additional data to your log


How to build
------------

First you need to init the node_modules (see https://gruntjs.com/getting-started if you are not familiar with Grunt).

    > ./init.sh


Build the library.

    > grunt build


Run the unit tests.

    > grunt test
