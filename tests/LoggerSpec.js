describe("Logger", function() {
    var
        logger,
        loggerModule = require('../build/js-logger');

    it("should be well build", function() {
        expect(typeof loggerModule).toEqual('object');
        expect(typeof loggerModule.Logger).toEqual('function');
        expect(typeof loggerModule.writers).toEqual('object');
        expect(typeof loggerModule.writers.console).toEqual('function');
    });

    beforeEach(function() {
        logger = new loggerModule.Logger();
    });

    it("should be able to register and unregister a writer", function() {
        var mockWriter = function(message, options) {};

        expect(Object.keys(logger.writers).length).toEqual(0);

        logger.registerWriter('console', mockWriter, logger.levels['On']);

        expect(Object.keys(logger.writers).length).toEqual(1);
        expect(typeof logger.writers['console']).toEqual(typeof mockWriter);
        expect(logger.writers['console'].level).toEqual(logger.levels['On']);

        logger.registerWriter('test', mockWriter, logger.levels['Warn']);

        expect(Object.keys(logger.writers).length).toEqual(2);
        expect(typeof logger.writers['test']).toEqual(typeof mockWriter);
        expect(logger.writers['test'].level).toEqual(logger.levels['Warn']);

        logger.unregisterWriter('console');
        expect(Object.keys(logger.writers).length).toEqual(1);
        expect(logger.writers['console']).toEqual(undefined);

        logger.unregisterWriter('test');
        expect(Object.keys(logger.writers).length).toEqual(0);
        expect(logger.writers['test']).toEqual(undefined);
    });

    it("should be able to write only when wanted", function() {
        var
            counter, 
            mockWriter = function(message, options) {
                counter++;
            };

        counter = 0;
        logger.registerWriter('console', mockWriter, logger.levels['On']);

        logger.debug('This is a "debug" example!' , {});
        logger.info('This is a "info" example!' , { prefix: 'an other prefix' });
        logger.warn('This is a "warn" example!' , {});
        logger.error('This is a "error" example!' , {});
        logger.fatal('This is a "fatal" example!' , { additionalData: { data: { foo: 'bar' } } });

        expect(counter).toEqual(5);


        counter = 0;
        logger.unregisterWriter('console');
        logger.registerWriter('console', mockWriter, logger.levels['Warn']);

        logger.debug('This is a "debug" example!' , {});
        logger.info('This is a "info" example!' , { prefix: 'an other prefix' });
        logger.warn('This is a "warn" example!' , {});
        logger.error('This is a "error" example!' , {});
        logger.fatal('This is a "fatal" example!' , { additionalData: { data: { foo: 'bar' } } });

        expect(counter).toEqual(3);
    });
});
