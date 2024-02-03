const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = async (data) => {
    const hashedPw = await bcrypt.hash(data.password, 12);

    const user = new User({
        email: data.email,
        password: hashedPw,
        name: data.name,
        surname: data.surname,
        role: data.role
    });
    return await user.save();
}

exports.loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            const error = new Error("There is no user registrated with this email address");
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            const error = new Error("Wrong password!");
            throw error;
        }

        const token = jwt.sign(
            { email: user.email, userId: user._id.toString(), role: user.role },
            "secretcode",
            { expiresIn: "1h" }
        );

        return { data: { token, userId: user._id.toString() } };
    } catch (error) {
        if (!error.statusCode) {
            console.log("An error happened!")
        }
        throw error;
    }
};


