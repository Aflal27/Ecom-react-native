import User from "../models/UserModel.js";
import crypto from "crypto";
import nodeMailer from "nodemailer";
import jwt from "jsonwebtoken";

// verification function
const sendEmailVerification = async (email, verifcationToken) => {
  // create node mailer transport
  console.log(verifcationToken);
  const transporter = nodeMailer.createTransport({
    //     SMTP_HOST=sandbox.smtp.mailtrap.io
    // SMTP_PORT=2525
    // SMTP_USER=796bdd38a51063
    // SMTP_PASS=54b76d5ac28702
    host: "sandbox.smtp.mailtrap.io",
    port: "2525",
    auth: {
      user: "796bdd38a51063",
      pass: "54b76d5ac28702",
    },
  });

  const mailOptions = {
    from: "AFL-e-com",
    to: email,
    subject: "Email verification",
    text: `Please click the following link to verify your email: http://localhost:8000/api/user/verify/${verifcationToken}`,
  };

  // send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log("verification email successfully!");
  } catch (error) {
    console.log("error verification send email", error);
  }
};

// register user
export const userRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      console.log("Email alredy registerd", email);
      return res.status(400).json("Email alredy registerd");
    }
    // gentare verfication token
    const verifcationToken = crypto.randomBytes(20).toString("hex");

    // create user
    const newUser = await User.create({
      name,
      email,
      password,
      verifcationToken,
    });
    console.log(newUser);

    // send verification email to user
    sendEmailVerification(newUser.email, newUser.verifcationToken);

    res
      .status(200)
      .json("register successfully. please check your email for verification");
  } catch (error) {
    next(error);
  }
};

// verifide the email
export const verifideEmail = async (req, res, next) => {
  try {
    const token = req.params.token;
    console.log(token);
    const user = await User.findOne({ verifcationToken: token });
    console.log(user);
    if (!user) {
      return res.status(400).json("Invalid verification token");
    }

    user.verified = true;
    user.verifcationToken = undefined;

    await user.save();
    res.status(200).json("email verifide successfully");
  } catch (error) {
    next(error);
  }
};

// login
export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json("Invalid email and password");
    }
    if (password !== user.password) {
      res.status(401).json("Invalid password");
    }
    const token = jwt.sign({ userId: user._id }, "aflal6719");
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

// create address
export const createAddress = async (req, res, next) => {
  try {
    const { userId, address } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }
    user.address.push(address);
    await user.save();

    res.status(200).json("address created successfully!");
  } catch (error) {
    next(error);
  }
};

// get address
export const getAddress = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }
    const address = user.address;

    res.status(200).json(address);
  } catch (error) {
    next(error);
  }
};

// get user
export const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json("user not found");
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
