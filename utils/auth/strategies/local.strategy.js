const { Strategy } = require('passport-local');
const authService = require('../../../services/auth.service');
const boom = require('@hapi/boom');

const service = new authService();

const localStrategy = new Strategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await service.getUser(email, password);
      done(null, user);
    } catch (e) {
      done(boom.unauthorized('Wrong password or email'), false);
    }
  }
);

module.exports = localStrategy;
