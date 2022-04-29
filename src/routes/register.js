const router = require('express').Router();
const sequelize = require('../db');
const { User } = sequelize.models;

router.post('/', async (req, res)=>{
    const { username, password, email } = req.body;

    try{
        if(!username || !password || !email) throw new Error('The necesary data was not send');

        const result = await User.findOne({
            where:{
                email
            }
        });

        if(result) throw new Error('User already exist');

        const newUser = await User.create({...req.body});
        res.status(201).json({success : 'User create successfuly', user : newUser});
    } catch(error){
        res.status(400).json({error: error.message});
    }
});

module.exports = router;