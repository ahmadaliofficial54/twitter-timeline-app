import axios from "axios";

const config = {
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
  },
};

export const fetchPosts = async (page) => {
  return await axios.get(`https://dmsglobal.net/ct-api/timeline`, {
    params: {
      page: page,
    },
    headers: config.headers,
  });
};

export const sendLikePost = async (postId) => {
  let formData = new FormData();
  formData.append("post_id", postId);
  return await axios.post(`https://dmsglobal.net/ct-api/like`, formData, {
    headers: config.headers,
  });
};

export const sendUnLikePost = async (postId) => {
  let formData = new FormData();
  formData.append("post_id", postId);
  return await axios.post(`https://dmsglobal.net/ct-api/unlike`, formData, {
    headers: config.headers,
  });
};
