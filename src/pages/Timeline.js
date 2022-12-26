import React, { useEffect, useState } from "react";
import { getPosts, likePost, unLikePost } from "../store/twitterSlice";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/post";
import Image from "../components/image";
// import InfiniteScroll from "react-infinite-scroller";
import CircularProgress from "@mui/material/CircularProgress";
import InfiniteScroll from "react-infinite-scroll-component";

function Timeline() {
  const [posts, setPosts] = useState([]);
  const postsInfo = useSelector((state) => state.twitterStore);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPosts(postsInfo?.posts);
  }, [postsInfo]);

  const loadPosts = () => {
    dispatch(getPosts(postsInfo?.page));
  };

  const likeUserPost = (postId) => {
    if (postsInfo?.likePostList?.includes(postId)) {
      dispatch(unLikePost(postId));
    } else dispatch(likePost(postId));
  };

  return (
    <div className="grid grid-cols-12 place-items-center">
      <Image />
      <div className="col-span-6">
        <div className="text-lg shadow mb-2 p-2 font-bold sticky top-0 bg-slate-900 text-white z-50">
          Home
        </div>
        <InfiniteScroll
          dataLength={posts?.length}
          next={loadPosts}
          hasMore={postsInfo?.page === postsInfo?.totalPage ? false : true}
          loader={
            <div className="loader text-center mt-4" key="spinner">
              <CircularProgress />
            </div>
          }
          endMessage={
            <div className="loader text-center mt-4" key="end">
              No more records!
            </div>
          }
        >
          {posts.map((post, index) => (
            <Post
              key={index}
              post={post}
              likePost={likeUserPost}
              likePostList={postsInfo?.likePostList}
            />
          ))}
        </InfiniteScroll>
      </div>
      <Image />
    </div>
  );
}

export default Timeline;
