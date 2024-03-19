// model
const { User } = require("../model/userModel");
const bcrypt = require("bcrypt");

// creation of the users
exports.registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).send({
                message: "inputField is missing",
                success: false
            })
        }

        // check for existing data
        const checkEmail = await User.findOne({ email: email });
        if (checkEmail) {
            return res.status(201).send({
                message: "exist",
                success: false
            })
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = {
            username: username,
            email: email,
            password: hashedPassword
        }
        const newUser = await User.create(data);
        return res.status(200).send({
            message: "notexist",
            success: true,
            newUser
        })
    } catch (error) {
        return res.status(400).send({
            message: "error at register",
            success: false
        })
    }
};

// all users
exports.getAllUser = async (req, res) => {
    try {
        const userData = await User.find({});
        if (userData) {
            return res.status(200).send({
                message: userData,
                userCount: userData.length,
                success: true
            })
        }
        return res.status(401).send({
            message: "error at fetching data",
            success: false
        })

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            message: "error at fetching User",
            success: false
        })
    }
};

// login
exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).send({
                message: "inputField empty",
                success: false
            })
        }

        // check user's info
        const checkInfo = await User.find({ email });
        console.log(checkInfo.length)
        if (checkInfo.length>0) {
            const verifyPass = await bcrypt.compare(password, checkInfo[0].password);
            if (!verifyPass) {
                return res.status(201).send({
                    message: "wrongPass",
                    success: false
                })
            }
            return res.status(200).send({
                message: "exist",
                success: true,
                user: checkInfo
            })
        }
        return res.status(201).send({   
            message: "notexist",
            success: false
        })

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            message: "error at login",
            success: false
        })
    }

};




