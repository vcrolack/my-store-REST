const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const userService = require('./user.service');
const { config, configEmail } = require('../config/config');

const service = new userService();

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized('Wrong password or email');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized('Wrong password or email');
    }
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.roleId,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token,
    };
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized('User not found');
    }
    const payload = {
      sub: user.id,
    };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
    const link = `http://myfrontend.com/recovery?token=${token}`;
    await service.update(user.id, {recoveryToken: token});
    const mail = {
      from: configEmail.email, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Recovery password', // Subject line
      html: `<b>Click this link: ${link}</b>`, // html body
    };
    const result = await this.sendMail(mail);
    return result;
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, {password: hash, recoveryToken: null});
      return { message: 'Password changed' };
    } catch(e) {
      throw boom.unauthorized();
    }
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: configEmail.email,
        pass: configEmail.emailKey,
      },
    });

    await transporter.sendMail(infoMail);
    return { message: 'Mail sent' };
  }
}

module.exports = AuthService;
