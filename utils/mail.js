import { createTransport } from "nodemailer";

export const mailTransport = createTransport({
    host: 'smtp.gmail.com',
    port: 587 ,
    secure: false,
    auth: {
        user: 'matthewdinko8@gmail.com',
        pass: 'mdou ncpg grtn kbpz'
    }
});

export const registerUserMailTemplate = `
        <div>
            <h1> Dear {{username}} </h1>
            <p> A new account has been created for you! </p>
            <h2> Thank you! </h2>
        </div>
        `;