import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";

import { updatePassword } from "../redux/actions/profileAction";
import { validateResetToken } from "../redux/actions/authAction";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Recover = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  if (!token) {
    navigate("/");
  }

  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    if (token) dispatch(validateResetToken({ token }));
  }, [token, dispatch]);
  const [typePass, setTypePass] = useState(false);

  const handleChangePassword = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePassword({ token, password }));
    navigate("/");
  };
  return (
    <div className="auth_page">
      <form className="recover-form" onSubmit={handleSubmit}>
        <h3>Set new password</h3>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>

          <div className="pass">
            <input
              type={typePass ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChangePassword}
              value={password}
              name="password"
            />

            <small
              onClick={() => setTypePass(!typePass)}
              style={{ marginRight: "10px" }}
            >
              {typePass ? (
                <VisibilityOffIcon color="rgb(243,243,247)" />
              ) : (
                <VisibilityIcon color="rgb(243,243,247)" />
              )}
            </small>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-dark w-100"
          disabled={password ? false : true}
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default Recover;
