import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import axios from "axios";


export default function BlogPost() {

  const [blogs, setBlog] = useState({});

  const router = useRouter();
  const id = router.query;

  const getIndividualBlog = async (id) => {
    try {
      const res = await axios.post("/api/individualblog", { id });
      setBlog(res.data.filterData);
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    getIndividualBlog(id);
  }, []);

  return (
    <div className="m-10">
      <div>
        <h2 className="text-center text-[30px]">Blogs</h2>
      </div>
      <div className="mt-10">
        <h1 className="text-[35px] text-center">{blogs.title}</h1>
        <img className="w-[300px] m-auto" src={blogs.image} />
        <p className="text-center text-[20px]">{blogs.description}</p>
      </div>
    </div>
  )
}
