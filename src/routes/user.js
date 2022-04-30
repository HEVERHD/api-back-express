const router = require('express').Router();
const sequelize = require('../db');
const { verifyAdminToken } = require('../utils/verifyToken');
const { User } = sequelize.models;

//BANEAR USUARIO
router.put('/ban/:id', verifyAdminToken, async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findOne({
			where: {
				id,
			},
		});

		if (!user) throw new Error('User not found');

		user.disable = !user.disable
		await user.save();

		res.status(200).json({
			user,
			message: 'User ban status updated',
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// router.put('/ban/:id',  async (req, res)=>{
//     let {id} = req.params
// 	let {ban} = req.body
// 	try {
//     const result = await User.findOne({
//         where:{
//             id,
// 			disable : false
//         }
//     });
// 	if(!result) throw new Error('User not found')
// 	result.ban = ban
// 	await result.save()
// 	res.status(200).json({
// 		message: 'User ban status updated',
// 		user: result
// 	})
// 	} catch (error) {
// 		res.status(400).json({ error: error.message });
// 	}
// })

//CAMBIAR ROL DE USUARIO
router.put('/role/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findOne({
			where: {
				id,
			},
		});

		if (!user) throw new Error('User not found');

		user.isAdmin = !user.isAdmin;
		await user.save();

		res.status(200).json({
			user,
			message: 'User role  updated',
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
