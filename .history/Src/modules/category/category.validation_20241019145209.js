import Joi from 'joi';

export const validateCategory = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        status: Joi.string().valid('active', 'not active').optional(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};
