import nodemailer from "nodemailer";

export async function sendEmail(email: string, url: string) {
  const account = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.test.email",
    port: 587,
    secure: false,
    auth: {
      user: account.user,
      pass: account.pass,
    },
  });

  const mailOptions = {
    from: "earthpiparat@gmail.com",
    to: email,
    subject: "Change password",
    text: "Change password?",
    html: `<a href="${url}">${url}</a>`,
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
