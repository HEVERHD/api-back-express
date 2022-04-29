const router = require('express').Router();
const sequelize = require('../db');
const jwt = require('jsonwebtoken');
const { User } = sequelize.models;
const { JWT_KEY } = process.env;

router.post('/', async (req, res)=>{
    const {username, password} = req.body;

    try{
        if(!username || !password) throw new Error('The necesaty data was not send');

        const result = await User.findOne({
            where:{
                username,
                password
            }
        });

        if(!result) throw new Error('User not found');

        //Generamos el token de acceso
        const accessToken = jwt.sign({
            role: result.isAdmin ? 'Admin' : 'Employed'  
        },JWT_KEY,{
            expiresIn : 60 * 60 * 1
        });

        res.status(200).json({
            user : result,
            accessToken
        });

    }catch(error){
        res.status(400).json({error: error.message});
    }
});

module.exports = router;