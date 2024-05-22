import jwt from "jsonwebtoken";
import { JWT_KEY } from "./Api.js";

export default function generateToken(userID) {
  console.log(JWT_KEY)
  const token = jwt.sign({ userID }, JWT_KEY, {
    expiresIn: "5d",
  });

  return token;
}
