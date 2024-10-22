import connectDB from "../utils/connectDB";
import User from "../models/userModel";
import { createActivationToken } from "../utils/generateToken";
import { ForgotPasswordEmail } from "../mails/forgotPasswordMail";

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      await forgotpassword(req, res);
      break;
    default:
      res.status(405).json({ err: "Method Not Allowed" });
      break;
  }
}

const forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "This email does not exists." });

    // Generate the one-time verication code

    const code = Math.floor(Math.random() * (9999 - 1000) + 1000).toString();

    const authorised = {
      id: user._id,
      code,
    };

    // Create activation token to save the userdata till they are verified
    const activation_token = createActivationToken(authorised);

    // send email to the user email
    ForgotPasswordEmail(email, user.name, code);

    // send feedback to the user
    res.json({
      message: "Please check your mail to get your one time code",
      activation_token,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
