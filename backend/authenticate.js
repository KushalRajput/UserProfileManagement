const jwt = require('jsonwebtoken');


exports.auth = (req, res, next) => {
    try {
        const decoded = jwt.verify(
            req.headers.authorization,
            process.env.SECRET_KEY,
        );
        req.userData = decoded;
        next();
    } catch (err) {
        res.status(200).json({
            message: 'auth failed',
            statusCode: 401,
            data: null,
            error: 'Auth Failed',
        });
    }
};
