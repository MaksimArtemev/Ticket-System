const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

// Define password complexity options
const complexityOptions = {
    min: 4, // Minimum length
    max: 30, // Maximum length
    lowerCase: 0, // Minimum number of lowercase letters
    upperCase: 0, // Minimum number of uppercase letters
    numeric: 0, // Minimum number of numeric characters
    symbol: 0, // Minimum number of special characters
    requirementCount: 1, // Number of complexity requirements to enforce (out of the above)
};

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin', 'employee'], default: 'user' }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        {
            _id: this._id,
            firstName: this.firstName,
            lastName: this.lastName,
            role: this.role // Include role in the token
        },
        process.env.JWTPRIVATEKEY,
        { expiresIn: "7d" }
    );
    return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity(complexityOptions).required().label("Password"),
        role: Joi.string().valid('user', 'admin', 'employee').optional() // Validate role field
    });
    return schema.validate(data);
};

module.exports = { User, validate };
