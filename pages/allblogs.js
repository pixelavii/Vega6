import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

const AllBlogs = () => {
    const router = useRouter();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);


    const getAllData = async () => {
        if (loading) {
            document.querySelector(".loader").style.display = "flex";
        }
        try {
            const res = await axios.get("/api/getall");
            setTasks(res.data.filterData);
        } catch (err) {
            alert(err);
        }
        document.querySelector(".loader").style.display = "none";
    };

    useEffect(() => {
        getAllData();
    }, []);

    return (
        <div>
            <div className='top-0'>
                <div className='m-5 flex justify-center items-center gap-10'>
                    <Button variant='contained' onClick={() => router.push("/login")}>Login</Button>
                    <Button variant='contained' onClick={() => router.push("/register")}>Register</Button>
                </div>
            </div>
            <div className='hidden loader justify-center items-center m-20'>
                <div className="wrapper">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="shadow"></div>
                    <div className="shadow"></div>
                    <div className="shadow"></div>
                </div>
            </div>
            <div>
                {tasks.map((task) => (
                    <div className='border-2 border-white p-5 flex flex-col m-10 gap-2 text-white justify-center items-center' key={task._id}>
                        <h2 className='text-[30px]'>{task.title}</h2>
                        <p className='text-[20px]'>{task.description.slice(0, 100) + "..."}</p>
                        <img className='w-[300px]' src={task.image} />
                        <Button variant="contained" color="secondary">
                            <Link href={`/blog/${task._id}`}  >
                                Read More
                            </Link>
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllBlogs