import axios from 'axios';
import React from 'react';
import Moment from 'react-moment'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const BlogCard = ({ title, desp, image, time, author, isUser, id }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/blogs-details/${id}`)
    }

    const handleDel = async () => {
        console.log(id)
        try {
            const confirmUser = window.confirm("Are you sure about deleting it?");
            if (confirmUser) {
                const { data } = await axios.delete(`http://localhost:8000/blog/delete-blog/${id}`);
                if (data.success) {
                    toast.success('😒 Blog Deleted!', {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    setTimeout(() => {

                        window.location.reload();
                    }, 1500);
                }
            }
            else {
                toast.success('👍 Reversed Your action!', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (error) {
            toast.error('🤔 Something went wrong!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    return (
        <div>
            <div className="card mb-3 container">
                <div className="row g-0">
                    <div className="col-md-4 image">
                        <img src={image} className="img-fluid rounded-start" alt="img-card" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title border-bottom p-2">{title}</h5><p className="card-text">{desp}</p>

                            <p className="card-text"><small className="text-body-secondary"><Moment format="dddd, MMMM Do YYYY, h:mm:ss a" className='text-danger'>{time}</Moment></small></p>
                            {isUser && (<>
                                <div className="edit-del-btn" style={{ display: "inline-block", cursor: "pointer" }}>
                                    <i className="fa-solid fa-pen-to-square mx-5 mt-3 " onClick={handleEdit}></i>
                                    <i className="fa-solid fa-trash" onClick={handleDel}></i>
                                </div>
                            </>)}
                            <button type="button" className="btn btn-primary position-relative float-end m-2">
                                @ {author}
                                <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                                    <span className="visually-hidden">New alerts</span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default BlogCard
