import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  blogs: [],
  selectedCategory: "All"
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogs(state, action) {
      state.blogs = action.payload;
    },
    addBlog(state, action) {
      state.blogs.push(action.payload);
    },
    deleteBlog(state, action) {
      state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
    },
    setCategory(state, action) {
      state.selectedCategory = action.payload;
    }
  }
});

export const { setBlogs, addBlog, deleteBlog, setCategory } = blogSlice.actions;
export default blogSlice.reducer;
