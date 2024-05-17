import jwt from "jsonwebtoken";

export default function generateToken(userID) {
  const token = jwt.sign({ userID }, process.env.JWT_KEY, {
    expiresIn: "5d",
  });

  return token;
}
