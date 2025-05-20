// pages/index.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Typography,
  Button,
  TextField,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import axios from "axios";
import Link from "next/link";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  let temp = 0;
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const userID =
    typeof window !== "undefined" ? localStorage.getItem("userID") : null;
  const user =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const [feedTask, setFeedTask] = useState({
    mytitle: "",
    mydescription: "",
  });
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!token) {
      router.push("/allblogs");
    }
    getData();
  }, []);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus("Please select an image file.");
      return;
    }

    try {
      const { mytitle, mydescription } = feedTask;

      const formData = new FormData();
      formData.append("mytitle", mytitle);
      formData.append("mydescription", mydescription);
      formData.append("image", file);
      formData.append("ID", userID);

      const res = await axios.post("/api/addTask", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFile(null);
      setPreview(null);
      setFile(null);
      setFeedTask({
        mytitle: "",
        mydescription: "",
      });
      alert(res.data.message);
      getData();
    } catch (err) {
      alert(err);
    }
  };

  const getData = async () => {
    try {
      const res = await axios.post("/api/getTask", { userID });
      setTasks(res.data.filterData);
    } catch (err) {
      alert(res.data.message);
    }
  };

  const ShowTaskColumns = async () => {
    document.querySelector(".showTaskColumn").style.display = "flex";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const deleteTask = async (id) => {
    try {
      const res = await axios.post("/api/delTask", { id });
      alert(res.data.message);
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="m-10 p-5">
      <div className="mt-5">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      <div className="mt-5">
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
        <Button
          className="ml-5"
          variant="contained"
          color="secondary"
          onClick={ShowTaskColumns}
        >
          Add Blog
        </Button>
      </div>

      <form
        onSubmit={addTask}
        className="mt-5 showTaskColumn"
        style={{ display: "none", gap: "4rem", marginBottom: "1rem" }}
      >
        <input
          className="border-2 text-black border-gray-200 w-32 rounded-lg"
          type="text"
          name="title"
          placeholder="Blog Title"
          onChange={(e) =>
            setFeedTask({ ...feedTask, mytitle: e.target.value })
          }
          value={feedTask.mytitle}
        />
        <textarea
          className="border-2 text-black border-gray-200 w-32 rounded-lg"
          type="text"
          name="description"
          placeholder="Blog Description"
          onChange={(e) =>
            setFeedTask({ ...feedTask, mydescription: e.target.value })
          }
          value={feedTask.mydescription}
        />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
      {preview && (
        <div style={{ marginTop: 20 }}>
          <h4>Preview:</h4>
          <img
            src={preview}
            alt="Preview"
            style={{ maxWidth: "200px", height: "auto" }}
          />
        </div>
      )}

      {/* Task From Database */}

      <Table className="mt-10">
        <TableHead>
          <TableRow>
            <TableCell className="text-[20px] text-white">Blog Title</TableCell>
            <TableCell className="text-[20px] text-white">Blog Description</TableCell>
            <TableCell className="text-[20px] text-white">Blog Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task._id}>
              <TableCell className="text-[15px] text-white">{task.title.slice(0,30) + "..."}</TableCell>
              <TableCell className="text-[15px] text-white">{task.description.slice(0, 50) + "..."}</TableCell>
              <img src={task.image} className="w-[100px] h-[100px]" />
              <TableCell>
                <Button variant="contained" color="secondary">
                  <Link href={`/blog/${task._id}`}  >
                    Read More
                  </Link>
                </Button>
              </TableCell>
              <TableCell>
                <Button onClick={() => deleteTask(task._id)} variant="contained" color="secondary">
                  Delete Blog
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
