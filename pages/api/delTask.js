import dbConnect from "@/utils/dbConnect";
import Task from "@/models/Task";

export default async function delTask(req, res) {

    if (req.method === "POST") {
        try {
            const ID = req.body.id;
            await dbConnect();
            await Task.deleteOne({ _id: ID });
            return res.status(200).send({ message: "Blog Deleted" });
        } catch (err) {
            return res.status(500).json({ message: "Something Went Wrong" });
        }
    }
}
