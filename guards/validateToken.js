import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export default async function validateToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No bearer token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorised - No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorised - Invalid Token" });
    }

    const currentUser = await User.findById(decoded.userID);

    if (!currentUser) {
      return res.status(401).json({ error: "Unauthorised - User not found" });
    }

    req.user = currentUser;

    next();
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}
