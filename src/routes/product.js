const router = require('express').Router();
const sequelize = require('../db');
const {Product, User} = sequelize.models;
const { verifyEmployedToken } = require('../utils/verifyToken')

router.post('/', verifyEmployedToken, async (req, res)=>{
    const {title, description, price, stock, ownerId} = req.body;
    try{
        if(!title || !description || !price || !stock || !ownerId) throw new Error('The necesary data was not send');

        const user = await User.findOne({
            where:{
                id : ownerId
            }
        });

        if(!user) throw new Error('User not found');

        const newProduct = await Product.create({...req.body});
        user.addProducts(newProduct);
        res.status(201).json({success: 'Product create successfuly', product : newProduct});
    }catch(error){
        res.status(400).json({error : error.message});
    }
});

module.exports = router;