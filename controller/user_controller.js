const userModel = require("../model/user_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { token_key } = process.env


exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!(username && password)) return res.json("Please Enter All Fields");

        const existingUser = await userModel.findOne({ username });
        if (existingUser) return res.json("User Already Exists");

        const encPass = await bcrypt.hash(password, 8);

        await userModel.create({
            username: username, password: encPass
        });

        res.json("User Created Successfully");
        console.log("User Created Successfully");
    }
    catch (err) {
        console.error(err);
        return res.json(err.message);
    }

};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!(username && password)) return res.json("Please Enter Username and Password");
        const currentUser = await userModel.findOne({ username });
        if (!currentUser) return res.json("No Users found!");

        const checkPass = await bcrypt.compare(password, currentUser.password);

        if (currentUser && checkPass) {
            const jwtToken = jwt.sign({ id: currentUser._id, name: currentUser.username }, token_key);

            return (
                res.cookie('accessToken', jwtToken, {
                maxAge: 5000,
                secure: true,
                httpOnly: true,
                sameSite: 'lax'
            }),
                res.json("Logged in Successfully")
            );
        }
        else {
            return res.json("Login failed")
        }
    }
    catch (err) {
        console.error(err);
        return res.json(err.message);
    }
};

exports.logout = (req, res) => {

    return (
        res.clearCookie(),
        res.json("Logged out Successfully")
    )

}
