const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jayujoshi59@gmail.com",
    pass: "jayjoshi2000",
  },
});
const sendMail = (req, res) => {
  const { name, message } = req.body;

  const mailOptions = {
    from: "jayujoshi59@gmail.com",
    to: "jayjoshi2000",
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent: " + info.response);
  });
};

module.exports = {
  sendMail,
};
