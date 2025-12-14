import React, { useEffect, useState } from "react";
import axios from "axios";
import AddBlogForm from "../../components/AddBlogForm";
import BlogList from "../../components/BlogList";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);

  const [categoryFilter, setCategoryFilter] = useState("All");

  const fetchBlogs = () => {
    axios
      .get("http://localhost:3000/blog") // relative to public/
      .then((res) => setBlogs(res.data.blogs))
      .catch((err) => console.error("Failed to load blogs", err));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleAddBlog = (newBlog) => {
    axios
      .post("http://localhost:3000/blog", newBlog)
      .then((res) => {
        //setBlogs((prev) => [...prev, res.data.blog]); // update state
        fetchBlogs();
      })
      .catch((err) => console.error("Failed to add blog", err));
  };

  const handleDeleteBlog = (id) => {
    axios
      .delete(`http://localhost:3000/blog/delete/${id}`)
      .then((res) => {
        setBlogs((prev) => prev.filter((blog) => blog._id !== id));
        //fetchBlogs();
      })
      .catch((err) => console.error("Failed to delete blog", err));
  };

  const handleUpdateBlog = (blog) => {
    // open a modal OR pre-fill AddBlogForm with blog data
    console.log("Update blog:", blog);
  };

  const handleCategoryChange = (category) => {
    setCategoryFilter(category);
  };

  const filteredBlogs =
    categoryFilter == "All"
      ? blogs
      : blogs.filter((blog) => blog.category === categoryFilter);

  const allCategories = ["All", ...new Set(blogs.map((blog) => blog.category))];
  return (
    <div className="container">
      <h5>useState</h5>
      <div className="container mt-3">
        <div className="d-flex flex-wrap gap-2 overflow-auto">
          {allCategories.map((category, idx) => (
            <button
              key={idx}
              className="btn btn-outline-primary"
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <AddBlogForm onAddBlog={handleAddBlog} />
      <BlogList
        blogs={filteredBlogs}
        selectedCategory={categoryFilter}
        onUpdate={handleUpdateBlog}
        onDelete={handleDeleteBlog}
      />
    </div>
  );
};

export default BlogPage;
