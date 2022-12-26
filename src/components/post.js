import React from "react";
import { Avatar, SvgIcon } from "@mui/material";
import moment from "moment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function Post({ post, likePost, likePostList }) {
  return (
    <div className="flex flex-row p-4 border">
      <div className="pr-2">
        <Avatar
          alt="Remy Sharp"
          src={post?.user?.profile_image_url}
          sx={{ width: 56, height: 56 }}
        />
      </div>
      <div className="flex flex-col">
        <div>
          <span className="font-bold pr-1">{`${post?.user?.first_name} ${post?.user?.last_name}`}</span>
          <span className="text-gray-400">
            <span className="pr-1">@{post?.user?.company_name}</span>
            <span className="pr-1 align-text-bottom">.</span>
            <span>{moment(post?.created_at).fromNow()}</span>
          </span>
        </div>
        <div className="text-sm">{post?.text}</div>
        <div className="flex mt-6 text-gray-400">
          <div className="cursor-pointer columns-3">
            <div className="hover:text-[#0f77ac]">
              <SvgIcon
                fontSize="large"
                sx={{
                  padding: "8px",
                  borderRadius: "20px",
                  ":hover": {
                    backgroundColor: "#dceef0",
                  },
                }}
              >
                <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
              </SvgIcon>
              {post?.replies_count ? (
                <span className="text-sm">{post?.replies_count}</span>
              ) : null}
            </div>
          </div>
          <div
            className={
              likePostList?.includes(post.id)
                ? "text-[#FE6C6C] cursor-pointer mr-4"
                : "hover:text-[#FE6C6C] cursor-pointer mr-4"
            }
            onClick={() => {
              likePost(post?.id);
            }}
          >
            <FavoriteBorderIcon
              fontSize="large"
              sx={{
                padding: "8px",
                borderRadius: "20px",
                ":hover": {
                  backgroundColor: "#FFB8B8",
                },
              }}
            />
            {post?.likes_count ? (
              <span className="text-sm">{post?.likes_count}</span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
