import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.routes.js";
import blogRouter from "./routes/blog.routes.js";
import contentRouter from "./routes/content.routes.js";
import courseRouter from "./routes/course.routes.js";
import userRouter from "./routes/user.routes.js";
import discussionRouter from "./routes/discussion.routes.js";
import messageRouter from "./routes/messages.routes.js";
import validateToken from "./guards/validateToken.js";
import { app, server } from "./socket/socket.js";

// Config
dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.get("/", (req, res) => {
  console.log("sample");
  return res.status(200).json({ done: true });
});

//  auth routes
app.use("/auth", authRouter);
app.use("/users", validateToken, userRouter);

// blog routes
app.use("/blogs", blogRouter);
app.use("/discussions", validateToken, discussionRouter);

// courses routes
app.use("/course", validateToken, courseRouter);
app.use("/content", validateToken, contentRouter);

// messages routes
app.use("/messages", validateToken, messageRouter);

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  connectDB();
});
