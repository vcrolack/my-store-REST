const joi = require('joi');

const token = joi.string();
const newPassword = joi.string();

const recoveryPasswordSchema = joi.object({
  token: token.required(),
  newPassword: newPassword.required(),
});

module.exports = {
  recoveryPasswordSchema,
};
