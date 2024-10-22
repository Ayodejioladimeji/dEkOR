import { formatMoney } from "@/utils/utils";

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // Use Gmail's service
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

interface EmailData {
  email: string;
  name: string;
  orderId: string;
  orderDate: string;
  orderAmount: number;
  status: string;
}

// Step 2: Define the email sending function
export const NewOrderEmail = ({
  email,
  name,
  orderId,
  orderDate,
  orderAmount,
  status,
}: EmailData) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "New Order Notification",
    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Order Notification</title>
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
    h3 {
      color: #2a9df4;
      font-size: 18px;
    }
    .footer {
      margin-top: 30px;
      text-align: center;
      font-size: 13px;
      color: #888888;
    }
  </style>
</head>
<body>

  <div class="email-container">
    <h2>New Order Notification</h2>

    <p>Hi Admin,</p>

    <p>A new order has been successfully placed by <strong>${name}</strong> and payment has been confirmed. Below are the details of the order:</p>

    <h3>Order Details:</h3>
    <p><strong>Order ID:</strong> ${orderId}</p>
    <p><strong>Order Date:</strong> ${orderDate}</p>
    <p><strong>Amount Paid:</strong> ${formatMoney(orderAmount)}</p>
    <p><strong>Payment Status:</strong> ${status}</p>

    <p>Please review the order and ensure the necessary processing is carried out.</p>

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
