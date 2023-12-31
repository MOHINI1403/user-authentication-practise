const Joi=require('@hapi/joi');

//RegisterValidation 
const registerValidation=data=>{
    const Schema=Joi.object({
        name:Joi.string().min(6).required(),
        email:Joi.string().min(6).required().email(),
        password:Joi.string().min(6).required()
    })
    return Schema.validate(data,Schema);
}

/*const loginValidation=()=>{
    const Schema=Joi.object({
        email:Joi.string().min(6).required().email(),
        passowrd:Joi.string().min(6).required()
    })
}*/
module.exports.registerValidation=registerValidation
//module.exports.loginValidation=loginValidation