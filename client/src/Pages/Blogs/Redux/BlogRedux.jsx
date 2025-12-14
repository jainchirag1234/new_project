import React, { useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setBlogs, addBlog, setCategory, deleteBlog } from './blogSlice';
import BlogList from '../../../components/BlogList';
import AddBlogForm from '../../../components/AddBlogForm';

const API_URL = "http://localhost:3000/blog";

const BlogRedux = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.blogs);
  const selectedCategory = useSelector((state) => state.blog.selectedCategory);

  useEffect(() => {
     axios
      .get(API_URL)
      .then((res) => {
        if (res.data.success) {
          dispatch(setBlogs(res.data.blogs));
        }
      })
      .catch((err) => console.error("Failed to load blogs", err));
  }, [dispatch]);

  // Add blog
  const handleAddBlog = async (newBlog) => {
    try {
      const res = await axios.post(API_URL, newBlog);
      if (res.data.success) {
        dispatch(addBlog(res.data.blog));
      }
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  // Delete blog
  const handleDeleteBlog = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/delete/${id}`);
      if (res.data.success) {
        dispatch(deleteBlog(id));
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  const allCategories = ["All", ...new Set(blogs.map((blog) => blog.category))];

  return (
    <div className="container">
      <h5 className="mt-4">Redux Blog</h5>

      <div className="d-flex flex-wrap gap-2 my-3">
        {allCategories.map((category, idx) => (
          <button
            key={idx}
            className={`btn btn-outline-primary ${selectedCategory === category ? "active" : ""}`}
            onClick={() => dispatch(setCategory(category))}
          >
            {category}
          </button>
        ))}
      </div>

      <AddBlogForm onAddBlog={handleAddBlog} />
      <BlogList blogs={filteredBlogs} selectedCategory={selectedCategory} onDelete={handleDeleteBlog}/>
    </div>
  );
};

export default BlogRedux;
