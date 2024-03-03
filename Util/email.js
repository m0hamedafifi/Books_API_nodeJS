const nodemailer = require("nodemailer");

module.exports.sendEmail = async (toMail, subject, bodyMsg) => {
  try {
    let transporter = await nodemailer.createTransport({
      host: process.env.HOSTMAIL,
      service: process.env.SERVICE,
      port: process.env.PORTMAIL,
      secure: false, // upgrade later with STARTTLS / TLS
      auth: {
        user: process.env.LOGINMAIL,
        pass: process.env.PASSWORDMAIL,
      },
      debug:true,
      
    });

    let info = await transporter.sendMail({
      from: `"fifty" <${process.env.LOGINMAIL}>`, // sender address
      to: toMail, // list of receivers
      subject: subject, // Subject line
      html: bodyMsg, // plain text body
    });
    console.log("Message sent: %s", info.messageId);
    return `Message sent: ${info.messageId}`;
  } catch (err) {
    console.error(err.message);
    return err;
  }
};
