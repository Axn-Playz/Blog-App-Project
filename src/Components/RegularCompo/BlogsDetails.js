import React, { useEffect, useState } from 'react';
import NavBar from '../ResusableCompo/NavBar';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const BlogsDetails = () => {
    const Params = useParams();
    const navigate = useNavigate();
    const user = localStorage.getItem('userId');
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const handleImageErr = () => {
        setImagePreview("https://www.rescuedigitalmedia.com/wp-content/uploads/2018/10/fix-invalid-image-error.png");
    }
    const handleImageInputChange = (e) => {
        const imageURL = e.target.value;
        setImageURL(imageURL);
        setImagePreview(imageURL);
    };

    const id = useParams().id;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/blog/all-blog/${id}`);
                console.log(data)
                if (data.success) {
                    console.log(data)
                    setTitle(data?.blog.title);
                    setDescription(data?.blog.description);
                    setImagePreview(data?.blog.image);
                    setImageURL(data?.blog.image);
                }

            } catch (error) {
                console.log('the error is ', error)
            }
        }
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`http://localhost:8000/blog/update-blog/${id}`, { title, description, image: imageURL });
            if (data?.success) {
                toast.success('✔ Blog Updated!', {
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
                    setTitle("");
                    setDescription("");
                    setImageURL("");
                    setImagePreview(null);
                }, 1500);
            }
        } catch (error) {
            console.log(error);
            toast.error('🤔Something went wrong!', {
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
    };

    return (
        <div>
            <div className="nav-bar">
                <NavBar />
            </div>

            <div className="post-page">
                <div className='container'>
                    <form action='POST'>
                        <h2>What changes to do here ?  </h2>
                        <br />
                        <div className="mb-3">
                            <label htmlFor="emailInput" className="form-label">Title</label>
                            <input type="text" value={title} className="form-control" id="exampleInput" onChange={(e) => setTitle(e.target.value)} />
                            <div id="emailHelp" className="form-text">Add suitable title for your post.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                            <textarea className="form-control" value={description} aria-label="With textarea" onChange={(e) => setDescription(e.target.value)} ></textarea>
                            <div id="emailHelp" className="form-text">Feel happy to share your thoughts anywhere, anytime, and anything.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="emailInput" className="form-label">Image URL</label>
                            <br />
                            <img src={imagePreview ? imagePreview : "https://static1.squarespace.com/static/5898e29c725e25e7132d5a5a/58aa11bc9656ca13c4524c68/58aa11e99656ca13c45253e2/1487540713345/600x400-Image-Placeholder.jpg?format=original"} className="rounded mx-auto d-block" alt="Preview" style={{ width: "300px" }} onError={handleImageErr} />
                            <br />
                            <input type="text" value={imageURL} className="form-control" id="exampleInput" onChange={handleImageInputChange} />
                            <div id="emailHelp" className="form-text">Add suitable image URL for your post.</div>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3 p-2 w-50" onClick={handleSubmit}>Update</button>
                        <br />
                        <Link to="/all-blog">Go back to home</Link>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default BlogsDetails
