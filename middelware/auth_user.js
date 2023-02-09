const jsonWebToken = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {

        const token = req.headers.authorization.split('Beare:')[1];
        const decodedToken = jsonWebToken.verify(JSON.parse(token), "RANDOM_TOKEN_SECRET");
        const userId = decodedToken;
        
        req.auth = { token: userId.id };

        if (req.body.id && req.body.id !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: 'Invalid request!'
        });
    }

};