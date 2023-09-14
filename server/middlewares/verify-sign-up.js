const User = require('../models/user-model');
const Electrician = require('../models/electrician-model');

const checkDuplicateEmail = async (req, res, next) => {
    const user = await User.findOne({
        email: req.body.email
    });
    console.log(user);
        if(user) {
            res.status(400).send({message: 'Failed! Email already in use!'});
            return;
        }

        next();
    
};

const checkDuplicateEmailElectrician = async (req, res, next) => {
    const electrician = await Electrician.findOne({
        email: req.body.email
    });
    console.log(electrician);
        if(electrician) {
            res.status(400).send({message: 'Failed! Email already in use!'});
            return;
        }

        next();
    
};

module.exports = { checkDuplicateEmail, checkDuplicateEmailElectrician };