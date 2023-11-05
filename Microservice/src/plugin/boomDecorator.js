'use strict';

const Boom = require('@hapi/boom');

const boomFunctions = [
    'badRequest',
    'unauthorized',
    'paymentRequired',
    'forbidden',
    'notFound',
    'methodNotAllowed',
    'notAcceptable',
    'proxyAuthRequired',
    'clientTimeout',
    'conflict',
    'resourceGone',
    'lengthRequired',
    'preconditionFailed',
    'entityTooLarge',
    'uriTooLong',
    'unsupportedMediaType',
    'rangeNotSatisfiable',
    'expectationFailed',
    'badData',
    'preconditionRequired',
    'tooManyRequests',
    'badImplementation',
    'internal',
    'notImplemented',
    'badGateway',
    'serverUnavailable',
    'gatewayTimeout',
    'illegal',
    'teapot',
];

const internals = {
    pluginName: 'boomDecorator',
};

const plugin = {
    name: internals.pluginName,
    version: '1.0.0',
    register: (server, options) => {
        boomFunctions.forEach((boomFunction) => {
            server.decorate('response', boomFunction, function () {
                this.response(Boom[boomFunction].apply(Boom, arguments));
            });
        });

        server.decorate('response', 'boom', function () {
            var args = Array.prototype.slice.call(arguments);
            let boom;

            if (args.length > 1 && args[1] instanceof Error) {
                boom = Boom.wrap(args[1], args[0], args.slice(2, args.length - 2));
            } else {
                boom = Boom.create.apply(null, args);
            }

            this.response(boom);
        });
    },
};

module.exports = plugin;
