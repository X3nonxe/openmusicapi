const Joi = require('joi');

const MusicPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.string().required(),
  genre: Joi.string().required(),
  performer: Joi.string().required(),
  duration: Joi.string(),
  albumId: Joi.string(),
});

module.exports = MusicPayloadSchema;
