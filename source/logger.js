"use strict";
define(['require'] , function (require) {

    function isWritable(level, logSeverity) {
        if (level === false) {
            return false;
        }
        if (level === true) {
            return true;
        }
        if (level <= logSeverity) {
            return true;
        }

        return false
    }


    /**
     * Logger constructor.
     *
     */
    function Logger() {
        this.writers = {};
    }
    // Apply constructor.
    Logger.prototype.constructor = Logger;

    /**
     * Instance properties.
     */
    Object.defineProperties(Logger.prototype, {
        levels: {
            /**
             * Get the available severity levels.
             *
             * @returns {Object}
             */
            get: function () {
                return {
                    'Off':   false,
                    'On':    true,
                    'Trace': 100,
                    'Debug': 200,
                    'Info':  300,
                    'Warn':  400,
                    'Error': 500,
                    'Fatal': 600
                }
            }
        }
    });

    /**
     # Log a message with the "Trace" severity (6/6).
     *
     * @public
     * @param   {String}        message         The message content
     * @param   {Object}        options         (optional) The options to apply
     * @returns {Self}
     */
    Logger.prototype.trace = function(message, options) {
        this.log('Trace', message, options);
        return this;
    }

    /**
     # Log a message with the "Debug" severity (5/6).
     *
     * @public
     * @param   {String}        message         The message content
     * @param   {Object}        options         (optional) The options to apply
     * @returns {Self}
     */
    Logger.prototype.debug = function(message, options) {
        this.log('Debug', message, options);
        return this;
    }

    /**
     # Log a message with the "Info" severity (4/6).
     *
     * @public
     * @param   {String}        message         The message content
     * @param   {Object}        options         (optional) The options to apply
     * @returns {Self}
     */
    Logger.prototype.info = function(message, options) {
        this.log('Info', message, options);
        return this;
    }

    /**
     # Log a message with the "Warn" severity (3/6).
     *
     * @public
     * @param   {String}        message         The message content
     * @param   {Object}        options         (optional) The options to apply
     * @returns {Self}
     */
    Logger.prototype.warn = function(message, options) {
        this.log('Warn', message, options);
        return this;
    }

    /**
     # Log a message with the "Error" severity (2/6).
     *
     * @public
     * @param   {String}        message         The message content
     * @param   {Object}        options         (optional) The options to apply
     * @returns {Self}
     */
    Logger.prototype.error = function(message, options) {
        this.log('Error', message, options);
        return this;
    }

    /**
     # Log a message with the "Fatal" severity (1/6).
     *
     * @public
     * @param   {String}        message         The message content
     * @param   {Object}        options         (optional) The options to apply
     * @returns {Self}
     */
    Logger.prototype.fatal = function(message, options) {
        this.log('Fatal', message, options);
        return this;
    }

    /**
     # Log a message.
     *
     * @public
     * @param   {String}        severity        The severity of the message
     * @param   {String}        message         The message content
     * @param   {Object}        options         (optional) The options to apply
     * @returns {Self}
     */
    Logger.prototype.log = function(severity, message, options) {
        var
            prefix   = '',
            prefixes = [];

        if (this.levels[severity]) {
            severity = this.levels[severity];
        }

        if ('undefined' !== typeof options) {
            if ('undefined' !== typeof options.prefix) {
                if (options.prefix.constructor == Array) {
                    prefixes = options.prefix;
                } else {
                    prefixes = [options.prefix];
                }
                delete options.prefix;
            }
        } else {
            options = {};
        }

        for (var i=0; i<prefixes.length; i++) {
            prefix += '[' + prefixes[i].toUpperCase() + ']';
        }
        if (prefix != '') {
            prefix += ' ';
        }

        options.logger   = this;
        options.severity = severity;

        for (name in this.writers) {
            if (isWritable(this.writers[name].level, severity)) {
                if (this.writers[name].log) {
                    this.writers[name].log(prefix + message, options)
                } else {
                    this.writers[name](prefix + message, options)
                }
                
            }
        }

        return this;
    }

    /**
     # Register a writer.
     # A writer is an object that implement a "log" function or a simple callable.
     # The log parameters are : String severity, String message, Object additionalData
     *
     * @public
     * @param   {String}            name            The writer name
     * @param   {Object|Function}   writer          The writer (must implement a log function if an object)
     * @param   {Integer}           level           The minimum level to actually write log 
     * @returns {Self}
     */
    Logger.prototype.registerWriter = function(name, writer, level) {
        if (this.levels[level]) {
            level = this.levels[level];
        }

        writer.level       = level;
        this.writers[name] = writer;
        return this;
    }

    /**
     # Unregister a writer.
     *
     * @public
     * @param   {String}        name            The writer name
     * @returns {Self}
     */
    Logger.prototype.unregisterWriter = function(name) {
        delete this.writers[name];
        return this;
    }


    return Logger;
});