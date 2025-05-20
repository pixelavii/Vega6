import dbConnect from "@/utils/dbConnect";
import Task from "@/models/Task";
import mongoose from "mongoose";

export default async function getTask(req, res) {
  if (req.method === "POST") {
    try {
      const ID = req.body.id;

      if (!mongoose.Types.ObjectId.isValid(ID.id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      await dbConnect();
      const blog = await Task.findById(ID.id);

      if (!blog) {
        return res.status(404).json({ message: "Task not found" });
      }

      const base64Image = `data:${blog.image.contentType};base64,${blog.image.data.toString("base64")}`;

      const filterData = {
        _id: blog._id,
        title: blog.title,
        description: blog.description,
        identifier: blog.identifier,
        image: base64Image,
      };

      return res.status(200).json({ filterData });
    } catch (err) {
      console.error("Error fetching task:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}

