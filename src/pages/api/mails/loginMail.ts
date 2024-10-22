const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // Use Gmail's service
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Step 2: Define the email sending function
export const LoginEmail = (email, name) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "User Login",
    html: `
     <html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset</title>
</head>
<body>

  <div class="email-container">
    <h2>User Login</h2>

    <p>Hi Admin,</p>

    <p>A new user just logged in ${name}</p>

    <p class="footer">Best regards, <br> Dekor Support Team</p>
  </div>

</body>
</html>
    `,
  };

  // Step 3: Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
