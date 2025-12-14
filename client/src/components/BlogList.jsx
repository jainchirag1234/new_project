import React from "react";

const BlogList = ({ blogs, selectedCategory, onUpdate, onDelete }) => {
  return (
    <div className="row mt-4">
      {blogs.map((blog) => (
        <div key={blog._id} className="col-md-6 mb-4">
          <div className="card shadow-sm h-100 border-primary">
            <div className="card-body">
              <h5 className="card-title text-primary">{blog.title}</h5>
              <p className="card-text text-truncate-3">{blog.description}</p>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <span className="badge bg-info">{blog.category}</span>
                <small className="text-muted">
                  By {blog.createdBy} • {blog.time}
                </small>
              </div>
              <div className="d-flex justify-content-end gap-2 mt-3">
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => onUpdate(blog)}
                >
                    Update
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(blog._id)}
                >
                    Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
