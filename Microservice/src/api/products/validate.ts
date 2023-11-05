import * as Joi from 'joi';

export default {
    addProduct: {
        payload: Joi.object({
            name: Joi.string().required(),
            price: Joi.string().required(),
            description: Joi.string().required(),
            image: Joi.string().required(),
            otherAttributes: Joi.object().required(),
        }),
        headers: Joi.object({
            authorization: Joi.string().required(),
        }).unknown(),
    },
    listProduct: {
        payload: Joi.object({
            filters: Joi.object({
                attributeNames: Joi.array().items(Joi.string()).optional(),
                attributeValues: Joi.array().items(Joi.string()).optional()
            }).optional(),
            sortBy: Joi.string().optional(),
            sortOrder: Joi.string().optional(),
            limit: Joi.number().optional(),
            offset: Joi.number().optional(),
        }),
        headers: Joi.object({
            authorization: Joi.string().required(),
        }).unknown(),
    }
};
