//

const Joi = require('joi');

const validator = (schema, object) => {
    const validator = Joi.object().keys(schema);
    return validator.validate(object);
}

module.exports = {
    validator
}