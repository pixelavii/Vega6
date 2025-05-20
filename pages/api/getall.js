import dbConnect from "@/utils/dbConnect";
import Task from "@/models/Task";

export default async function getAllTask(req, res) {
  if (req.method === "GET") {
    try {
      await dbConnect();
      const data = await Task.find();

      const filterData = data.map((task) => {
        const base64Image = `data:${
          task.image.contentType
        };base64,${task.image.data.toString("base64")}`;
        return {
          _id: task._id,
          title: task.title,
          description: task.description,
          identifier: task.identifier,
          image: base64Image,
        };
      });

      return res.status(200).send({ filterData });
    } catch (err) {
      return res.status(200).json({ message: "Something went wrong" });
    }
  }
}
