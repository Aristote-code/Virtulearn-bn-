import Content from "../models/content.model.js";

export async function getAllContent(req, res) {
  try {
    const content = await Content.find();
    return res.status(200).json(content);
  } catch (error) {
    console.log("Error: ", error.message);
    return res.status(500).json({ error: "Internal server Error" });
  }
}

export async function getContent(req, res) {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }
    return res.status(200).json(content);
  } catch (error) {
    console.log("Error: ", error.message);
    return res.status(500).json({ error: "Internal server Error" });
  }
}

export async function createContent(req, res) {
  try {
    const { message, link } = req.body;
    if (!message || !link) {
      return res.status(400).json({ error: "Message and link are required" });
    }
    const content = await Content.create({ message, link });
    return res.status(201).json(content);
  } catch (error) {
    console.log("Error: ", error.message);
    return res.status(500).json({ error: "Internal server Error" });
  }
}
export async function deleteContent(req, res) {
  Content.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json("Deleted the content successfully"))
    .catch(() => res.status(404).json({ error: "Content not found" }));
}
