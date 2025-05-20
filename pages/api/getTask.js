import dbConnect from "@/utils/dbConnect";
import Task from "@/models/Task";

export default async function getTask(req, res) {
  if (req.method === "POST") {
    try {
      const ID = req.body.userID;
      await dbConnect();
      const data = await Task.find();

      const finalData = data.filter((data) => data.identifier === ID);

      const filterData = finalData.map((task) => {
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
