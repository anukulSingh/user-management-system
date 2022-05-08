const jwt = require("jsonwebtoken");
const connection = require("../config/db.config");


// auth route
module.exports.auth = async (req, res, next) => {
    let token;

    // set token from header authorization
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
            data: null
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        let sql = `SELECT * from users WHERE id=${decoded.id}`
        connection.query(sql, function (err, result) {
            if (err) {
                console.error(err)
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized",
                    data: null
                });
            }
            if (result.length === 0) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized",
                    data: null
                });
            }
            req.user = result[0];
            next();
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
            data: null
        });
    }
}