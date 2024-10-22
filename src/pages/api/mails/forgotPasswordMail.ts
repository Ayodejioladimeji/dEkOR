const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // Use Gmail's service
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Step 2: Define the email sending function
export const ForgotPasswordEmail = (email, name, code) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Password Reset Request",
    html: `
     <html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h2 {
      color: #333333;
    }
    p {
      color: #555555;
      line-height: 1.6;
    }
    .reset-code {
      font-size: 18px;
      font-weight: bold;
      color: #2a9df4;
    }
    .footer {
      margin-top: 20px;
      text-align: center;
      font-size: 12px;
      color: #888888;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      font-size: 16px;
      color: #ffffff;
      background-color: #2a9df4;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
    }
    .button:hover {
      background-color: #2382d7;
    }
  </style>
</head>
<body>

  <div class="email-container">
    <h2>Password Reset Request</h2>

    <p>Hi ${name},</p>

    <p>We have received a request to reset your password. Please use the following code to proceed with resetting your password:</p>

    <h3 class="reset-code">Reset Code: ${code}</h3>

    <p>If you did not request this password reset, please ignore this email. For your security, do not share this code with anyone.</p>

    <p class="footer">If you need further assistance, feel free to contact our support team.</p>

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
