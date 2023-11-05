import * as Joi from 'joi';

export default {
    mailAuthorization: {
        payload: Joi.object({
            email: Joi.string().required().email()
        })
    }
};
