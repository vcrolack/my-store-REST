const { Strategy, ExtractJwt } = require('passport-jwt');
const {config} = require('../../../config/config');
const boom = require('@hapi/boom');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
}

const JwtStrategy = new Strategy(options, (payload, done) => {
  try {
    done(null, payload);
  } catch (e) {
    done(boom.unauthorized(e), false);
  }
})

module.exports = JwtStrategy;
