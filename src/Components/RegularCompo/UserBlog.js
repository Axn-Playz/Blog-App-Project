import axios from 'axios';
import React, { useState, useEffect } from 'react';
import NavBar from '../ResusableCompo/NavBar';
import BlogCard from '../ResusableCompo/BlogCard';
import { Link } from 'react-router-dom';

const UserBlog = () => {
  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const id = localStorage.getItem('userId');
        const { data } = await axios.get(`http://localhost:8000/blog/user-blog/${id}`);
        if (data.success) {
          setBlogs(data?.blog.blogs);
        }
      } catch (error) {
        console.log('error')
      }
    }
    fetchAllBlogs();
  }, []);
  return (
    <div>
      <div className="nav-bar">
        <NavBar />
      </div>
      <div className="content container text-center mt-5">
        {blogs && blogs.length >= 1 ? (blogs.map((blog, index) => (
          <BlogCard id={blog._id} key={index} title={blog.title} desp={blog.description} image={blog.image} time={blog.createdAt} author={localStorage.getItem('userName')} isUser={true} />
        ))) : (<>
          <div className=' opps-rel'>
            <img className='no-result' src='https://cdn-icons-png.flaticon.com/512/6134/6134065.png' alt='error-img' />
            <h1 className=''>Opps! You didn't created any Blog</h1><br />
            <Link to='/post-blog' className='btn btn-primary mt-2'>Let's Create a blog</Link>
          </div>
        </>)}
      </div>

    </div>
  )
}

export default UserBlog
