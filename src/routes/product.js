const router = require('express').Router();
const sequelize = require('../db');
const {Product, User} = sequelize.models;
const { verifyEmployedToken } = require('../utils/verifyToken')


//TRAER TODOS LOS PRODUCTOS
router.get("/", async (req, res) => {
    const result = await Product.findAll({
    }) .then(res => res.map(item => {
      let producto = item.dataValues
      return {
        ...producto,
      }
    }))
    res.json(result);
  });

  //ELIMINAR PRODUCTO

  router.delete('/:sku', async (req, res)=>{
    const {sku} = req.params
    try{
        const product = await Product.findOne({
            where:{
                sku
            }
        });

        statusCode = 404
        if(!product) return res.status(400).json({error :'No product matches given SKU'})

        await product.destroy( ) 
        return res.status(200).json({success:`Product '${product.title}' was deleted`})
    }
    catch(err){ 
        return res.status(statusCode).json({error:err.message}) 
    }
})

//TREA UN PRODUCTO POR SKU

router.get("/:sku", async (req, res) => {
    const { sku } = req.params;
    try {
      const product = await Product.findOne({
        where: {
          sku,
        },
      });
  
      if (!product) return res.status(400).json({ error: "Product not found" });
      return res.json(product);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  });


  //EDITAR PRODUCTO
    router.put('/:sku', async (req, res)=>{
        const {sku} = req.params
        const {title, description, price, stock} = req.body
        try{
            const product = await Product.findOne({
                where:{
                    sku
                }
            });

            statusCode = 404
            if(!product) return res.status(400).json({error :'No product matches given SKU'})

            await product.update({...req.body}) 
            return res.status(200).json({success:`Product '${product.title}' was updated`})
        }
        catch(err){ 
            return res.status(statusCode).json({error:err.message}) 
        }
    })

    

//CREAR UN PRODUCTO
router.post('/',  async (req, res)=>{
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