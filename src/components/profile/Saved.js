import React, { useState, useEffect } from "react";

import LoadMoreBtn from "../LoadMoreBtn";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import PostCard from "../PostCard";
import { useSelector } from "react-redux";

const Saved = ({ auth, dispatch }) => {
  const [savePosts, setSavePosts] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(2);
  const [load, setLoad] = useState(false);
  const { theme } = useSelector((state) => state);

  useEffect(() => {
    setLoad(true);
    getDataAPI("getSavePosts", auth?.token)
      .then((res) => {
        setSavePosts(res.data.savePosts);
        setResult(res.data.result);
        setLoad(false);
      })
      .catch((err) => {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      });

    return () => setSavePosts([]);
  }, [auth?.token, dispatch]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`getSavePosts?limit=${page * 9}`, auth?.token);
    setSavePosts(res.data.savePosts);
    setResult(res.data.result);
    setPage(page + 1);
    setLoad(false);
  };

  return (
    <div>
      {savePosts.map((post) => (
        <PostCard key={post._id} post={post} theme={theme} />
      ))}

      {load && <HourglassTopRoundedIcon sx={{ color: "rgb(243,243,247)" }} />}

      <LoadMoreBtn
        result={result}
        page={page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default Saved;
