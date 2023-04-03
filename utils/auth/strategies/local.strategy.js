const { Strategy } = require('passport-local');
const userService = require('../../../services/user.service');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const service = new userService();

const localStrategy = new Strategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await service.findByEmail(email);
      if (!user) {
        done(boom.unauthorized('Wrong password or email'), false);
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        done(boom.unauthorized('Wrong password or email'), false);
      }
      delete user.dataValues.password;
      done(null, user);
    } catch (e) {
      done(boom.unauthorized('Wrong password or email'), false);
    }
  }
);

module.exports = localStrategy;
