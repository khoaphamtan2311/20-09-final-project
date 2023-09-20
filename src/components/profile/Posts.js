import React, { useState, useEffect } from "react";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import LoadMoreBtn from "../LoadMoreBtn";
import { getDataAPI } from "../../utils/fetchData";
import { PROFILE_TYPES } from "../../redux/actions/profileAction";
import PostCard from "../PostCard";
import { useSelector } from "react-redux";

const Posts = ({ auth, id, dispatch, profile }) => {
  const [posts, setPosts] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(false);

  const { theme } = useSelector((state) => state);

  useEffect(() => {
    profile.posts.forEach((data) => {
      if (data._id === id) {
        setPosts(data.posts);
        setResult(data.result);
        setPage(data.page);
      }
    });
  }, [profile.posts, id]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `user_posts/${id}?limit=${page * 9}`,
      auth?.token
    );
    const newData = { ...res.data, page: page + 1, _id: id };
    dispatch({ type: PROFILE_TYPES.UPDATE_POST, payload: newData });
    setLoad(false);
  };

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} theme={theme} />
      ))}

      {load && <HourglassTopRoundedIcon />}

      <LoadMoreBtn
        result={result}
        page={page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default Posts;
