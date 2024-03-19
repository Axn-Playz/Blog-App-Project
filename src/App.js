import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/RegularCompo/Login";
import Blog from './Components/RegularCompo/AllBlogs';
import Register from "./Components/RegularCompo/Register";
import UserBlog from "./Components/RegularCompo/UserBlog";
import CreateBlog from "./Components/RegularCompo/CreateBlog";
import BlogsDetails from "./Components/RegularCompo/BlogsDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/blog" element={<Blog/>}/>
        <Route path="/all-blog" element={<UserBlog/>}/>
        <Route path="/post-blog" element={<CreateBlog/>}/>
        <Route path="/blogs-details/:id" element={<BlogsDetails/>}/>
      </Routes>
    </Router>
  );
}

export default App;
