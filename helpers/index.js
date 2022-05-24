const nodeMailer = require("nodemailer");
 //dotenv package
const dotenv = require("dotenv");
dotenv.config();

const defaultEmailData = { from: "noreply@node-react.com" };

//this needs some extra work. Lecture 200

exports.sendEmail = emailData => {
    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: "nachojimenez.94@gmail.com",
            pass: process.env.FORGOT_PASS_KEY
        }
    });
    return (
        transporter
            .sendMail(emailData)
            .then(info => console.log(`Message sent: ${info.response}`))
            .catch(err => console.log(`Problem sending email: ${err}`))
    );
};