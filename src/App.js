import React, { useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Recover from "./pages/recover";
import MessageDetailPage from "./pages/message/MessageDetailPage";
import Message from "./pages/message";
import Post from "./pages/post";
import Profile from "./pages/profile";
import Discover from "./pages/discover";
import Search from "./pages/search";

import { useSelector, useDispatch } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";
import { getPosts } from "./redux/actions/postAction";
import { getSuggestions } from "./redux/actions/suggestionsAction";

import io from "socket.io-client";
import { GLOBALTYPES } from "./redux/actions/globalTypes";

import { getNotifies } from "./redux/actions/notifyAction";
import Peer from "peerjs";
import MainLayout from "./layouts/MainLayout";
import BlankLayout from "./layouts/BlankLayout";
import NotFound from "./components/NotFound";

function App() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());

    const socket = io("https://backend-final-project-fcdf.onrender.com");
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch]);

  useEffect(() => {
    if (auth?.token) {
      dispatch(getPosts(auth?.token));
      dispatch(getSuggestions(auth?.token));
      dispatch(getNotifies(auth?.token));
    }
  }, [dispatch, auth?.token]);

  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
        }
      });
    }
  }, []);

  useEffect(() => {
    const newPeer = new Peer(undefined, {
      path: "/",
      secure: true,
    });

    dispatch({ type: GLOBALTYPES.PEER, payload: newPeer });
  }, [dispatch]);

  function AuthRequire({ children }) {
    const location = useLocation();

    if (!auth.token) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route index element={<Home />} />

        <Route path="message" element={<Message />} />
        <Route path="discover" element={<Discover />} />
        <Route path="search" element={<Search />} />
        <Route path="message/:id" element={<MessageDetailPage />} />
        <Route path="post/:id" element={<Post />} />
        <Route path="profile/:id" element={<Profile />} />
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/recover" element={<Recover />} />
      </Route>
    </Routes>
  );
}

export default App;
