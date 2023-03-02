
const jsonWebToken = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split('Beare:')[1];
        const decodedToken = jsonWebToken.verify(JSON.parse(token), "RANDOM_TOKEN_SECRET");
        const userId = decodedToken.id;
        req.auth = { userId };

        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};