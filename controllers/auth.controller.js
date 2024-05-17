import generateToken from "../jwt/generateToken.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export async function signup(req, res) {
  try {
    // get all info from the request body
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
      profilePicture,
      isMentor,
    } = req.body;

    //Check if the password and confirmPassword are the same
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password Don't Match" });
    }

    //Check if the email is already in use
    const currentUser = await User.findOne({ email });

    if (currentUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    //Hash the passwordA
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    //Create a new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      profilePicture,
      isMentor,
      courses: [],
    });

    //Send a response
    res
      .status(201)
      .json({ message: `New ${isMentor ? "Mentor" : "Student"} Created` });
  } catch (error) {
    console.log("We had an error, ", error.message);
    res.status(500).json({ error: "An Error Occured" });
  }
}

export async function login(req, res) {
  try {
    // get the email and password from the request body
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    //Check if the email is already in use
    const currentUser = await User.findOne({ email });

    if (!currentUser) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    //Check if the password is valid
    const isPasswordValid = await bcrypt.compare(
      password,
      currentUser.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    //Generate a token
    const token = generateToken(currentUser._id);

    const response = currentUser._doc;
    delete response.password;
    //Send a response
    res.status(200).json({ ...response, token });
  } catch (error) {
    console.log("We had an error, ", error.message);
    res.status(500).json({ error: "An Error Occured" });
  }
}

export function logout(req, res) {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged Out" });
  } catch (error) {
    console.log("We had an error, ", error.message);
    res.status(500).json({ error: "An Error Occured" });
  }
}
