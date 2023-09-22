import React, { useState, useEffect, useRef } from "react";
import UserCard from "../UserCard";
import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../../utils/fetchData";
import { useNavigate, useParams } from "react-router-dom";
import {
  MESS_TYPES,
  getConversations,
} from "../../redux/actions/messageAction";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import SearchIcon from "../../icons/SearchIcon";
import { Box } from "@mui/material";

const LeftSide = () => {
  const { auth, message, online, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  const pageEnd = useRef();
  const [page, setPage] = useState(0);

  // const handleSearch = async (e) => {
  //   debugger;
  //   e.preventDefault();
  //   if (!search) return setSearchUsers([]);

  //   try {
  //     const res = await getDataAPI(`search?username=${search}`, auth?.token);
  //     setSearchUsers(res.data.users);
  //     console.log(searchUsers);
  //   } catch (err) {
  //     dispatch({
  //       type: GLOBALTYPES.ALERT,
  //       payload: { error: err.response.data.msg },
  //     });
  //   }
  // };

  const handleAddUser = (user) => {
    setSearch("");
    setSearchUsers([]);
    dispatch({
      type: MESS_TYPES.ADD_USER,
      payload: { ...user, text: "", media: [] },
    });
    dispatch({ type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online });
    return navigate(`/message/${user._id}`);
  };

  const isActive = (user) => {
    if (id === user._id) return "active";
    return "";
  };

  useEffect(() => {
    if (message.firstLoad) return;
    dispatch(getConversations({ auth }));
  }, [dispatch, auth, message.firstLoad]);

  // Load More
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(pageEnd.current);
  }, [setPage]);

  useEffect(() => {
    if (message.resultUsers >= (page - 1) * 9 && page > 1) {
      dispatch(getConversations({ auth, page }));
    }
  }, [message.resultUsers, page, auth, dispatch]);

  // Check User Online - Offline
  // useEffect(() => {
  //   if (message.firstLoad) {
  //     dispatch({ type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online });
  //   }
  // }, [online, message.firstLoad, dispatch]);

  return (
    <>
      <form className="message_header">
        <input
          type="text"
          value={search}
          placeholder="Enter to Search..."
          onChange={async (e) => {
            setSearch(e.target.value);

            const res = await getDataAPI(
              `search?username=${search}`,
              auth?.token
            );
            setSearchUsers(res.data.users);
            if (search.length <= 1) setSearchUsers([]);
          }}
        />

        <button
          style={{
            backgroundColor: "transparent",
            border: "none",
            paddingTop: 10,
            paddingRight: 10,
          }}
        >
          <SearchIcon />
        </button>
      </form>

      <div className="message_chat_list">
        {searchUsers.length !== 0
          ? search && (
              <>
                {searchUsers.map((user) => (
                  <Box
                    sx={{
                      backgroundColor: theme
                        ? "rgb(255,255,255, 0.5)"
                        : "rgb(30,30,30)",
                      borderRadius: "12px",

                      marginBottom: "4px",
                    }}
                    key={user._id}
                    className={`message_user ${isActive(user)}`}
                    onClick={() => handleAddUser(user)}
                  >
                    <UserCard user={user} />
                  </Box>
                ))}
              </>
            )
          : search === "" && (
              <>
                {message.users.map((user) => (
                  <div
                    key={user._id}
                    className={`message_user ${isActive(user)}`}
                    onClick={() => handleAddUser(user)}
                  >
                    <UserCard user={user} msg={true}>
                      {user.online ? (
                        <CircleRoundedIcon
                          sx={{ color: "green", fontSize: "small", ml: 1 }}
                        />
                      ) : (
                        auth?.user.following.find(
                          (item) => item._id === user._id
                        ) && (
                          <CircleRoundedIcon
                            sx={{
                              color: theme ? "#999999" : "white",
                              fontSize: "small",
                              ml: 1,
                            }}
                          />
                        )
                      )}
                    </UserCard>
                  </div>
                ))}
              </>
            )}

        <button ref={pageEnd} style={{ opacity: 0, color: "#777777" }}>
          Load More
        </button>
      </div>
    </>
  );
};

export default LeftSide;
