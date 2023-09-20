import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, requestReset } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const [typePass, setTypePass] = useState(false);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.token) navigate("/");
  }, [auth?.token, navigate]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleChangeEmail = (e) => {
    const { name, value } = e.target;
    setUserData({ [name]: value });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  return (
    <div className="auth_page">
      <form onSubmit={handleSubmit}>
        <h3 className="text-uppercase text-center mb-4">Gists</h3>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            aria-describedby="emailHelp"
            onChange={handleChangeInput}
            value={email}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>

          <div className="pass">
            <input
              type={typePass ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChangeInput}
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
          disabled={email && password ? false : true}
        >
          Log in
        </button>

        <p className="my-2">
          Forgot your password?
          <Button
            style={{ color: "rgb(243,243,247)", textTransform: "none" }}
            onClick={handleClickOpen}
            sx={{
              background: "none",
              ":hover": {
                backgroundColor: "transparent",
                textDecoration: "underline",
                border: "none",
              },
            }}
          >
            Click here
          </Button>
        </p>

        <p className="my-2">
          You don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "rgb(243,243,247)",
              fontWeight: 500,
              fontSize: "0.875rem",
            }}
          >
            Register Now
          </Link>
        </p>
      </form>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "rgb(16,16,16)",
            color: "rgb(243,243,247)",
            boxShadow: " 0 0 10px rgb(4, 13, 18)",
            borderRadius: "20px",
          },
        }}
      >
        <DialogTitle>
          Please enter your Email address to recover your account
        </DialogTitle>
        <DialogContent>
          <input
            type="email"
            className="form-control recover-input"
            name="email"
            onChange={handleChangeEmail}
            value={email}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              color: "#777777",
              borderRadius: "30px",
              borderWidth: "2px",
              borderStyle: "solid",
              borderColor: "#777777",
              px: 2,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              dispatch(requestReset(userData));
              handleClose();
            }}
            autoFocus
            sx={{
              color: "rgb(243,243,247)",
              borderRadius: "30px",
              borderWidth: "2px",
              borderStyle: "solid",
              borderColor: "#777777",
              px: 2,
            }}
          >
            Send verification email
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Login;
