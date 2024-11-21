import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchPostsOld = () => {
  return api.get("/posts");
};

export const fetchPosts = async (page) => {
  try {
    const res = await api.get(`/posts?_start=${page}&_limit=5`);
    if (res.status == 200) {
      return res.data;
    } else {
      throw new Error("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchSinglePost = async (id) => {
  try {
    const res = await api.get(`/posts/${id}`);
    if (res.status == 200) {
      return res.data;
    } else {
      throw new Error("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    return {};
  }
};

export const deletePost = async (id) => {
  try {
    const res = await api.delete(`/posts/${id}`);
    if (res.status == 200) {
      return res.data;
    } else {
      throw new Error("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    return {};
  }
};

export const updatePost = async (data) => {
  try {
    const res = await api.patch(`/posts/${data.id}`, data);
    if (res.status == 200) {
      return res.data;
    } else {
      throw new Error("Something Went Wrong");
    }
  } catch (err) {
    console.log(err);
    return {};
  }
};

export const fetchUsers = async ({ pageParam = 1 }) => {
  try {
    const res = await axios.get(
      `https://api.github.com/users?per_page=10&page=${pageParam}`
    );
    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("Something Went Wrong");
    }
  } catch (err) {
    console.error(err);
    return [];
  }
};
