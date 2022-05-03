const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {

    try {
        const reqtoken = req.cookies.accessToken || req.headers['x-auth-token'];
        if (!reqtoken) return res.json("No Valid Token found");

        else 
            jwt.verify(reqtoken, process.env.token_key)
        
    }
    catch (err) {
        console.log(err);
        return res.json("Cannot Verify Token: ", err.message)
    }

    return next();
};

module.exports = verifyToken;