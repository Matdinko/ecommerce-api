import { UserModel } from "../models/user.js";
import { mailTransport, registerUserMailTemplate } from "../utils/mail.js";
import { loginUserValidator, registerUserValidator, updateUserValidator } from "../validators/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res, next) => {
    // Validate user information
    const { error, value } = registerUserValidator.validate(req.body);
    if (error) {
        return res.status(422).json(error);
    }
    // Check if user does not exist already
    const user = await UserModel.findOne({
        $or: [
            { username: value.username },
            { email: value.email }
        ]
    });
    if (user) {
        return res.status(409).json('User already exists!');
    }
    // Hash plaintext password
    const hashedPassword = bcrypt.hashSync(value.password, 10);
    // Create user record in database
    await UserModel.create({
        ...value,
        password: hashedPassword
    });
    // Send registration email to user
    // await mailTransport.sendMail({
    //     from: 'matthewdinko8@gmail.com',
    //     to: value.email,
    //     subject: 'Checking out Nodemailer',
    //     text: `Dear ${value.username},\nA new account has been created for you!\nThank you!`
    // });
    // await mailTransport.sendMail({
    //     from: 'matthewdinko8@gmail.com',
    //     to: value.email,
    //     subject: 'Checking out Nodemailer',
    //     html: `
    //     <div>
    //         <h1> Dear ${value.username} </h1>
    //         <p> A new account has been created for you! </p>
    //         <h2> Thank you! </h2>
    //     </div>
    //     `
    // });
    await mailTransport.sendMail({
        from: 'matthewdinko8@gmail.com',
        to: value.email,
        subject: 'Checking out Nodemailer',
        html: registerUserMailTemplate.replace('{{username}}', value.username)
    });
    // (Optionally) Generate access token for user
    // Return response
    res.status(201).json('User registered successfully!');
}

export const loginUser = async (req, res, next) => {
    // Validate user information
    const { error, value} = loginUserValidator.validate(req.body);
    if (error) {
        return res.status(422).json(error);
    }
    // Find matching user record in database
    const user = await UserModel.findOne({
        $or: [
            { username: value.username },
            { email: value.email }
        ]
    });
    if (!user) {
        return res.status(404).json('User does not exist!');
    }
    // Compare incoming password with saved password
    const correctPassword = bcrypt.compareSync(value.password, user.password);
    if (!correctPassword) {
        return res.status(401).json('Invalid credentials!');
    }
    // Generate access token for user
    const accessToken = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '24h' }
    )
    // Return response 
    res.status(200).json({ accessToken });
}

export const updateUser = async (req, res, next) => {
    // Validate request body
    const { error, value } = updateUserValidator.validate(req.body);
    if (error) {
        return res.status(422).json(error);
    }
    // Update user in the database
    const result = await UserModel.findByIdAndUpdate(
        // req.auth.id,
        // value
        req.params.id,
        value,
        { new: true }
    );
    // Return response 
    res.status(200).json(result);
}

export const getAuthenticatedUser = async (req, res, next) => {
    // Get user by id using req.auth.id
    try {
        const result = await UserModel
        .findById(req.auth.id)
        .select({password:false});
    
        // Return response 
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }

}