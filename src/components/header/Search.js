import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import UserCard from "../UserCard";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";

const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;

    try {
      setLoad(true);
      const res = await getDataAPI(`search?username=${search}`, auth?.token);
      setUsers(res.data.users);
      setLoad(false);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

  const handleClose = () => {
    setSearch("");
    setUsers([]);
  };

  return (
    <form className="search_form" onSubmit={handleSearch}>
      <input
        type="text"
        name="search"
        value={search}
        className="search-input"
        title="Enter to Search"
        onChange={(e) =>
          setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
        }
        placeholder="type something..."
      />

      <div style={{ margin: "20px 0" }}>
        <h3
          style={{
            fontWeight: "700",
            color: theme ? "#000" : "rgb(243,243,247)",
          }}
        >
          Search Box
        </h3>
      </div>

      <button type="submit" style={{ display: "none" }}>
        Search
      </button>

      {load && (
        <HourglassTopRoundedIcon
          sx={{ color: theme ? "#000" : "rgb(243,243,247)" }}
        />
      )}

      <div className="users">
        {search &&
          users.map((user) => (
            <UserCard
              key={user?._id}
              user={user}
              border="border"
              handleClose={handleClose}
            />
          ))}
      </div>
    </form>
  );
};

export default Search;
