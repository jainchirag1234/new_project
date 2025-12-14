import React, { useState } from "react";

const AddBlogForm = ({ onAddBlog }) => {
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [category, setCategory] = useState("");
  // const [createdBy, setCreatedBy] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    createdBy: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBlog = {
      id: Date.now(),
      ...form,
      time: new Date().toLocaleString(), // simple date format
    };

    onAddBlog(newBlog);

    setForm({
      title: "",
      description: "",
      category: "",
      createdBy: "",
    });

    // Clear form
    // setTitle("");
    // setDescription("");
    // setCategory("");
    // setCreatedBy("");
  };

  return (
    <div className="container border p-4 rounded mt-4">
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <input
            type="text"
            placeholder="Blog Title"
            className="form-control"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <textarea
            placeholder="Blog Description (2 lines)"
            className="form-control"
            rows={3}
            name="description"
            value={form.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Category"
            className="form-control"
            name="category"
            value={form.category}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Created By"
            className="form-control"
            name="createdBy"
            value={form.createdBy}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-primary">Add Blog</button>
      </form>
    </div>
  );
};

export default AddBlogForm;
