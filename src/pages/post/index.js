import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPost } from "../../redux/actions/postAction";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import PostCard from "../../components/PostCard";
import InputComment from "../../components/home/InputComment";
import Comments from "../../components/home/Comments";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);

  const { auth, detailPost } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost({ detailPost, id, auth }));

    if (detailPost.length > 0) {
      const newArr = detailPost.filter((post) => post._id === id);
      setPost(newArr.slice(0, 1));
    }
  }, [detailPost, dispatch, id, auth]);
  return (
    <div className="d-flex">
      <div className="col-md-3"></div>
      <div className="col-md-5">
        <div className="posts">
          {post.length === 0 && (
            <HourglassTopRoundedIcon sx={{ color: "rgb(243,243,247)" }} />
          )}

          {post.length !== 0 &&
            post.map((item) => (
              <div key={item._id}>
                <PostCard key={item._id} post={item} />
                <InputComment post={item} />
                <Comments post={item} />
              </div>
            ))}
        </div>
      </div>
      <div className="col-md-4"></div>
    </div>
  );
};

export default Post;
