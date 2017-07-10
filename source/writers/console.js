module.writers.console = (function() {

    /**
     * This writter can log something in the console.
     *
     * @private
     * @param   {String}   message         The message to log
     * @param   {Object}   options         The options to apply
     */
    function write(message, options) {
        var
            trace        = false,
            functionName = 'log';

        if (options.severity >= options.logger.levels.Fatal && window.console.exception) {
            functionName = 'exception';
        } else if (options.severity >= options.logger.levels.Error && window.console.error) {
            functionName = 'error';
        } else if (options.severity >= options.logger.levels.Warn && window.console.warn) {
            functionName = 'warn';
        } else if (options.severity >= options.logger.levels.Info && window.console.info) {
            functionName = 'info';
        } else if (options.severity >= options.logger.levels.Debug && window.console.debug) {
            functionName = 'debug';
        } else if (options.severity >= options.logger.levels.Trace && window.console.trace) {
            trace = true;
        }

        if (options.additionalData) {
            window.console[functionName](message, options.additionalData);
        } else {
            window.console[functionName](message);
        }

        if (trace === true) {
            window.console.trace();
        }
        
    }

    return write;

})();
