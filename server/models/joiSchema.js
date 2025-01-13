import joi from 'joi'

const joiUserSchema = joi.object({
    fullname: joi.string().required(),
    username: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    otp: joi.string().required()
})

const joiPostSchema = joi.object({
    username: joi.string().required(),
    caption: joi.string().required(),
    media: joi.string().required(),
})

export {joiUserSchema, joiPostSchema}