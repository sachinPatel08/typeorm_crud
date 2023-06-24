const nodemailer = require("nodemailer");
const { gmail , pass } = require('./email_cred')

const sendMail =async ()=>{
  
  let testAccount = await nodemailer.createTestAccount();
    console.log(gmail);
    
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
        from: `"Sachin Patel 👻" <${gmail}>`, // sender address
        to: "sachin08@yopmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
      console.log("Message sent: %s", info.messageId);
 
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    
}
sendMail()


