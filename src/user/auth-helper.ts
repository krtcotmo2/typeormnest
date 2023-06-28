import * as nodemailer from 'nodemailer';
import Mail from "nodemailer/lib/mailer";

export const createPassword = (): string => {
  let newPass = '';
  const rString =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let d = 0; d < 8; d++) {
    newPass += rString.charAt(Math.floor(Math.random() * rString.length));
  }
  return newPass;
};

export const emailedPassword = (pass: string, userEmail: string) =>{
    const nmEmailAcct = process.env.nmEmailAcct;
    const nmPass = process.env.nmPass;
    const smtpConnectionString = {
      service: 'Gmail',
      auth: {
        user: nmEmailAcct,
        pass: nmPass,
      },
    };
    const transporter = nodemailer.createTransport(smtpConnectionString);
    const mailOptions = {
      from: 'krtcotmo2@gmail.com',
      to: userEmail,
      cc: 'krtcotmo2@gmail.com',
      subject: 'DO NOT REPLY: Pathfinder Password Reset',
      html: `<h2>Password reset</h2><p>You received this email because you requested an password reset from the <a href='http://kurtisc.s3-website-us-east-1.amazonaws.com/'>site.</a></p><p>Your new temporary password is <b>${pass}</b></p><p>You will be prompted to enter in a new password after you log in with this password. There is no history of previous passwords so you can reuse them if desired.</p>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return false;
      } else {
        console.log('true');
        return true;
      }
    });
  };
