var Hapi = require('hapi');
var Path = require('path');
var Boom = require('boom');
var server = new Hapi.Server();
server.connection({ port: process.env.PORT });

server.route([
  {
    method: 'GET',
    path: '/',
    config: {
      handler: function (request, reply) {
        reply('hello');
      }
    }
  },
  {
    method: 'GET',
    path: '/error',
    config: {
      handler: function (request, reply) {
        reply(new Error('500'));
      }
    }
  },
  {
    method: 'GET',
    path: '/admin',
    config: {
      handler: function (request, reply) {
        reply(Boom.unauthorized('Anauthorised'));
      }
    }
  }

]);

server.register([require('../lib'), require('vision')], function (err) {
  if (err) {
    throw err;
  }
  server.views({
    engines: {
      html: require('handlebars')
    },
    path: Path.resolve(__dirname, './../lib')
  });

  server.start(function (err) {
    if (err) {
      throw err;
    }
    console.log('Visit:', server.info.uri);
  });
});

module.exports = server;
