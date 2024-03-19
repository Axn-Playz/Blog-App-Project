import React, { useEffect, useState } from 'react'
import NavBar from '../ResusableCompo/NavBar'
import axios from 'axios'
import BlogCard from '../ResusableCompo/BlogCard';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [srchItem , setSrchItem ] = useState('');
  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/blog/all-blogs");
        if (data.message === "blog") {
          setBlogs(data?.blogs);
          console.log(data.blogs[0]._id)
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
        <div className="container-fluid srch-bar">
    <form className="d-flex" role="search">
      <input className="form-control me-2" type="search" placeholder="Enter title keyword" aria-label="Search" value={srchItem} onChange={e=>setSrchItem(e.target.value)}/>
      <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
  </div>
      </div>
      
      <div className="content container">
        {blogs ? blogs.filter(val=>(
          srchItem === '' ? val : val.title.toLowerCase().includes(srchItem.toLowerCase())
        )).map((blog, index) => (
          <BlogCard key={index} title={blog.title} desp={blog.description} image={blog.image} time={blog.createdAt} author={blog.user.username} isUser={localStorage.getItem('userId') === blog.user._id} id={blog._id}/>
        )) : (<h1>No blog found..</h1>)}
      </div>

    </div>
  )
}

export default Blog
