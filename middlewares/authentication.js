const jwt = require("jsonwebtoken")
require("dotenv").config()
const secretKey = process.env.secretKey

const authenticator = (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        jwt.verify(token, secretKey, function(err, decoded) {
            if (err) {
                err = {
                  name: 'JsonWebTokenError',
                  message: 'jwt malformed'
                }            
            }

            next();
        });
    } else {
        return res.status(500).send("Invalid Token, please login again")  
    }

}

module.exports = authenticator
