const nodemailer = require("nodemailer");
const { gmail , pass } = require('./email_cred')

const sendMail =async (to , subject , html)=>{
  
  let testAccount = await nodemailer.createTestAccount();
    console.log(to);
    
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: gmail,
          pass: pass
        },
      });

      let info = await transporter.sendMail({
        from: `"Sachin Patel 👻" <${gmail}}>`, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        html: html, // html body
      });
      console.log("Message sent: %s", info.messageId);
 
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    
}

module.exports = {sendMail}


