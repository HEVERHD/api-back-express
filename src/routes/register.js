const router = require('express').Router();
const sequelize = require('../db');
const { User } = sequelize.models;

router.get('/', async (req, res) => {
	const result = await User.findAll({}).then((res) =>
		res.map((item) => {
			let id = item.dataValues;
			return {
				...id,
			};
		})
	);
	res.json(result);
});

//BANEAR USUARIO
router.put('/user/ban/:id', async (req, res) => {
	const { id } = req.params;
	const { ban } = req.body;
	try {
		const user = await User.findOne({
			where: {
				id,
			},
		});

		if (!user) throw new Error('User not found');

		user.ban = ban;
		await user.save();

		res.status(200).json({
			user,
			message: 'User ban status updated',
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.post('/', async (req, res) => {
	const { username, password, email } = req.body;

	try {
		if (!username || !password || !email)
			throw new Error('The necesary data was not send');

		const result = await User.findOne({
			where: {
				email,
			},
		});

		if (result) throw new Error('User already exist');

		const newUser = await User.create({ ...req.body });
		res.status(201).json({ success: 'User create successfuly', user: newUser });
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
