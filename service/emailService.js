const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
      api_user: ''
    }
  }))

  exports.sendVerificationEmail = async (email, verificationToken) => {
    const msg = {
        to: email,
        from: 'boramenerja2000@gmail.com', 
        subject: 'Welcome to our app',
        text: 'You are successfully registered!',
        html: `<p>Click <a href="http://localhost:4004/auth/activate/${verificationToken}">here</a> to activate your account.</p>`
    };
    await transporter.sendMail(msg);
};