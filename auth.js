const router=require('express').Router();
const User=require('../model/User');

const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const {registerValidation}=require('../validation');
const Joi=require('@hapi/joi');

//Validation 

const Schema=Joi.object({
    name:Joi.string().min(6).required(),
    email:Joi.string().min(6).required().email(),
    password:Joi.string().min(6).required()
})

router.post('/register',async (req,resp)=>{

    //Lets validate the data before adding into user

    const {error}=Schema.validate(req.body,Schema);
    if(error){
        return resp.status(400).send(error);
    }

    //checking weather the user exits
    //const emailExists=await User.findOne({email:req.body.email});

    //Hash Password:
    const salt=await bcrypt.gentSalt(10);
    const hashPassword=await bcrypt.hash(req.body.password,salt);


    //if(emailExists)return resp.status(400).send('Email already Exists');
    const user=new User({
        name:req.body.name,
        email:req.body.email,
        password:hashPassword

    });
    try{
        const savedUser=await user.save();
        //resp.send({user:user._id})
        resp.send(savedUser);
    }
    catch(err){
        resp.status(400).send(err);
    }

});

router.post('/login',async (req,resp)=>{
    const {error}=loginValidation(req.body);
    if(error)return resp.status(400).send(error.details[0].message);

    //Checking if the email exists
    const user=await User.findOne({email:req.body.email});
    if(!user){
        return resp.status(400).send("Email not Found");
    }
    //Password is Correct
    const validPass=await bcrypt.compare(req.body.password,user.password);
    if(!validPass)return resp.status(400).send('Invalid Password');

    //Using and Creating the Web Token
    const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    resp.header('Auth-Token',token).send(token);
    resp.send('Logged In');
})
/*

/api/users/login

*/
module.exports=router