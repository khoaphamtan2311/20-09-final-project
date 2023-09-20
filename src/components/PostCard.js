import React from "react";
import CardHeader from "./home/post_card/CardHeader";
import CardBody from "./home/post_card/CardBody";
import CardFooter from "./home/post_card/CardFooter";

const PostCard = ({ post, theme }) => {
  return (
    <div className="card my-3 pb-4">
      <CardHeader post={post} />
      <div style={{ height: "20px" }} />
      <div style={{ paddingLeft: "50px" }}>
        <CardBody post={post} theme={theme} />
        <div style={{ height: "10px" }} />
        <CardFooter post={post} />
      </div>
    </div>
  );
};

export default PostCard;
