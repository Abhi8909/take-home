

//
const Joi = require('joi');

const agentSchema = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    photoUrl: Joi.string().allow(null, ''),
    agentLicence: Joi.string().required(),
    address: Joi.string().required(),
    practiceAreas: Joi.string().required(),
    aboutMe: Joi.string()
};

const reviewSchema = {
    agentId: Joi.number().required(),
    review: Joi.string().required()
}

module.exports = {
    agentSchema,
    reviewSchema
}