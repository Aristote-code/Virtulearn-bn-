import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getRecievedSocketId, io } from "../socket/socket.js";

export async function sendMessages(req, res) {
  try {
    //correct information from the req
    const { message } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    //     check if conversation exists otherwise create it
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recieverId],
      });
    }

    // create new message
    const newMessage = await Message.create({
      message,
      senderId,
      recieverId,
    });

    //     save message in a conversation
    if (newMessage) {
      await conversation.messages.push(newMessage._id);
      await conversation.save();
    }

    const recieverSocketId = getRecievedSocketId(recieverId);
    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json(newMessage);
  } catch (error) {
    console.log("we had a error:  ", error.message);
    return res.status(500).json({ error: "Internal server Error" });
  }
}

export async function getMessages(req, res) {
  try {
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);

    return res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("we had a error:  ", error.message);
    return res.status(500).json({ error: "Internal server Error" });
  }
}
