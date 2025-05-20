import dbConnect from "@/utils/dbConnect";
import Task from "@/models/Task";
import multer from "multer";
import nc from "next-connect";

const upload = multer({ storage: multer.memoryStorage() });

const handler = nc();

handler.use(upload.single("image"));

handler.post(async (req, res) => {
  try {
    await dbConnect();

    const { mytitle, mydescription, ID } = req.body;

    const task = new Task({
      title: mytitle,
      description: mydescription,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      identifier: ID,
    });

    await task.save();

    return res.status(201).json({ message: "Blog added successfully" });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ message: "Something Went Wrong" });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
