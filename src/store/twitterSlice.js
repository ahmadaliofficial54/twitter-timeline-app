import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPosts, sendLikePost, sendUnLikePost } from "../service/service";

const initialState = {
  page: 1,
  totalPost: 0,
  totalPage: 0,
  postThreshold: 10,
  posts: [],
  likePostList: [],
};

export const getPosts = createAsyncThunk("dms/fetchPosts", async (page) => {
  const response = await fetchPosts(page || 1);
  return response.data;
});

export const likePost = createAsyncThunk("dms/likePost", async (postId) => {
  const response = await sendLikePost(postId);
  response.data["postId"] = postId;
  return response.data;
});

export const unLikePost = createAsyncThunk("dms/unLikePost", async (postId) => {
  const response = await sendUnLikePost(postId);
  response.data["postId"] = postId;
  return response.data;
});

export const twitterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      let postsData = action?.payload;
      state.totalPost = postsData?.totalPosts;
      state.page += 1;
      // if (state.posts.length === state.postThreshold * 2) {
      //   state.posts.splice(0, state.postThreshold);
      // }
      state.posts = state.posts.concat(postsData?.data);
      state.totalPage = postsData?.totalPages;
      // return action.payload;
    });
    builder.addCase(likePost.fulfilled, (state, action) => {
      if (action.payload?.status === "ok") {
        const postId = action.payload?.postId;
        const index = state.posts.findIndex((post) => {
          return post.id === postId;
        });
        state.posts[index].likes_count += 1;
        state.likePostList.push(postId);
      }
    });
    builder.addCase(unLikePost.fulfilled, (state, action) => {
      if (action.payload?.status === "ok") {
        const postId = action.payload?.postId;
        const index = state.posts.findIndex((post) => {
          return post.id === postId;
        });
        state.posts[index].likes_count -= 1;
        const indexLikePost = state.likePostList.findIndex((id) => {
          return id === postId;
        });
        state.likePostList.splice(indexLikePost, 1);
      }
    });
  },
});

export default twitterSlice.reducer;
