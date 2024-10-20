import Joi from 'joi';

export const createCategoryValidation = {
    body: Joi.object({
        name: Joi.string().required(),
        image: Joi.string().required(),
        status: Joi.string().valid('active', 'inactive')
    })
};

export const updateCategoryValidation = {
    body: Joi.object({
        name: Joi.string().optional(),
        image: Joi.string().optional(),
        status: Joi.string().valid('active', 'inactive').optional()
    })
};
