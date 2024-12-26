import joi from 'joi'

const joiUserSchema = joi.object({
    fullname: joi.string().required(),
    username: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
})

export {joiUserSchema}