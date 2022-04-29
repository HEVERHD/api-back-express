const jwt = require('jsonwebtoken');

const verifyEmployedToken = (req, res, next) =>{
    const { token } = req.headers;
    if(!token) return res.status(400).json({error: 'Token not provided'});

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    console.log(decoded);
    if(decoded.role){
        next();
    } else {
        res.status(400).json({error: 'you dont have the permissions'});
    }
};

const verifyAdminToken = (req, res, next) =>{
    const { token } = req.headers;
    if(!token) return res.status(400).json({error: 'Token not provided'});

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if(decoded.role === 'Admin'){
        next()
    } else{
        res.status(400).json({error: 'you dont have the permissions'});
    }
}

module.exports = {
    verifyEmployedToken,
    verifyAdminToken
}