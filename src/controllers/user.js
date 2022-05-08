const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const config = require("../config/config");
const connection = require("../config/db.config");

/**
 * This controller helps in registering a user
 * @access public   role["USER"]
 * @url POST  /api/v1/users/register
 */
module.exports.userRegister = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            age,
            address,
            city,
            state,
            zip
        } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        let sql = `INSERT INTO users (name, email, password, age, address, city, state, zip, image) VALUES ("${name}", "${email}", "${hashedPass}", ${age}, "${address}", "${city}", "${state}", "${zip}", "${req.file.path}")`;
        connection.query(sql, function (err, result) {
            if (err) {
                console.error(err)

                return res.status(500).json({
                    success: false,
                    message: "Error registering user",
                    data: err
                });
            }
            return res.status(200).json({
                success: true,
                message: "User registered successfully",
                data: null
            });
        });
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: "Error registering user",
            data: err
        });
    }
}

/**
 * This controller helps in signing in an existing user
 * @access public   role["USER"]
 * @url POST  /api/v1/users/login
 */
module.exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        let sql = `SELECT * FROM users WHERE email="${email}"`
        connection.query(sql, async function (err, result) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Error logging in user",
                    data: err
                });
            };
            if (result.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid credentials",
                    data: null
                });
            }
            const validated = await bcrypt.compare(password, result[0].password);
            delete result[0].password;
            if (!validated) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid credentials",
                    data: null
                });
            }
            const token = jwt.sign(
                { id: result[0].id },
                config.JWT_SECRET,
                { expiresIn: config.JWT_EXPIRE }
            )
            return res.status(200).json({
                success: true,
                message: "User Login successful",
                token,
                data: result
            })
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error logging in user",
            data: error
        });
    }
}


/**
 * This controller helps in updating a user's info
 * @access private   role["USER"]
 * @url PUT  /api/v1/users/:userId
 */
module.exports.userUpdate = async (req, res) => {
    try {
        const { userId } = req.params;
        if (req.user.id.toString() !== userId.toString()) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
                data: null
            });
        }
        if (req.file) {
            req.body.image = req.file.path
        }
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(req.body.password, salt);
            req.body.password = hashedPass
        }
        let sql = `UPDATE users SET ? WHERE id = ?`
        connection.query(sql, [req.body, userId], function (err, result) {
            if (err) {
                console.error(err)
                return res.status(500).json({
                    success: false,
                    message: "Error updating user",
                    data: err
                });
            }
            return res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: null
            });
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating user",
            data: error
        });
    }
}

/**
 * This controller helps in deleting an existing user
 * @access private   role["USER"]
 * @url DELETE  /api/v1/users/:userId
 */
module.exports.userDelete = async (req, res) => {
    try {
        const { userId } = req.params;
        if (req.user.id.toString() !== userId.toString()) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
                data: null
            });
        }
        let sql = `DELETE FROM users WHERE id="${userId}"`
        connection.query(sql, function (err, result) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Error deleting user",
                    data: err
                });
            };
            return res.status(200).json({
                success: true,
                message: "User deleted successfully",
                data: null
            })
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting user",
            data: error
        });
    }
}

/**
 * This controller helps in getting a list of all users
 * @access private   role["USER"]
 * @url GET  /api/v1/users
 */
module.exports.getUsers = async (req, res) => {
    try {
        let sql = `SELECT * FROM users`
        connection.query(sql, function (err, result) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Error fetching users",
                    data: err
                });
            }
            result.map(user => delete user.password)
            return res.status(200).json({
                success: true,
                message: "Users fetched successfully",
                data: result
            });
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error fetching users",
            data: error
        });
    }
}

/**
 * This controller helps in getting a particular user's info
 * @access private   role["USER"]
 * @url GET  /api/v1/users/:userId
 */
module.exports.getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        let sql = `SELECT * FROM users where id = "${userId}"`
        connection.query(sql, function (err, result) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Error fetching user",
                    data: err
                });
            }
            delete result[0].password;
            return res.status(200).json({
                success: true,
                message: "User fetched successfully",
                data: result
            });
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error fetching user",
            data: error
        });
    }
}