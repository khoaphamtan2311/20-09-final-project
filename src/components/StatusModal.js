import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { createPost, updatePost } from "../redux/actions/postAction";
import Icons from "./Icons";
import { imageShow, videoShow } from "../utils/mediaShow";
import FilterIcon from "@mui/icons-material/Filter";
import { IconButton } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

const StatusModal = () => {
  const { auth, theme, status, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);

  const handleChangeImages = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newImages = [];

    files.forEach((file) => {
      if (!file) return (err = "File does not exist.");

      if (file.size > 1024 * 1024 * 5) {
        return (err = "The image/video largest is 5mb.");
      }

      return newImages.push(file);
    });

    if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setImages([...images, ...newImages]);
  };

  const deleteImages = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (images.length === 0)
    //   return dispatch({
    //     type: GLOBALTYPES.ALERT,
    //     payload: { error: "Please add your photo." },
    //   });

    if (status.onEdit) {
      dispatch(updatePost({ content, images, auth, status }));
    } else {
      dispatch(createPost({ content, images, auth, socket }));
    }

    setContent("");
    setImages([]);
    dispatch({ type: GLOBALTYPES.STATUS, payload: false });
  };

  useEffect(() => {
    if (status.onEdit) {
      setContent(status.content);
      setImages(status.images);
    }
  }, [status]);

  return (
    <div className="status_modal">
      <form onSubmit={handleSubmit}>
        <div className="status_header">
          <h3 className="m-0">Create Post</h3>
          <IconButton
            onClick={() =>
              dispatch({
                type: GLOBALTYPES.STATUS,
                payload: false,
              })
            }
            sx={{ color: theme ? "#000" : "rgb(243,243,247)" }}
          >
            <CloseIcon />
          </IconButton>
        </div>

        <div className="status_body">
          <textarea
            name="content"
            value={content}
            placeholder={`@${auth?.user?.username}, what is on your mind?`}
            onChange={(e) => setContent(e.target.value)}
            style={{
              color: theme ? "#111" : "white",
              background: theme ? "" : "rgba(0,0,0,.01)",
            }}
          />

          <div className="d-flex">
            <div className="flex-fill"></div>

            <Icons setContent={setContent} content={content} theme={theme} />
          </div>

          <div className="show_images">
            {images.map((img, index) => (
              <div key={index} id="file_img">
                {img.camera ? (
                  imageShow(img.camera, theme)
                ) : img.url ? (
                  <>
                    {img?.url?.match(/video/i)
                      ? videoShow(img.url, theme)
                      : imageShow(img.url, theme)}
                  </>
                ) : (
                  <>
                    {img?.type?.match(/video/i)
                      ? videoShow(URL.createObjectURL(img), theme)
                      : imageShow(URL.createObjectURL(img), theme)}
                  </>
                )}
                <span onClick={() => deleteImages(index)}>&times;</span>
              </div>
            ))}
          </div>

          <div className="input_images">
            <div className="file_upload">
              <IconButton
                sx={{ color: theme ? "rgb(30,30,30)" : "rgb(243,243,247)" }}
                size="large"
              >
                <FilterIcon />
              </IconButton>
              <input
                type="file"
                name="file"
                id="file"
                multiple
                accept="image/*,video/*"
                onChange={handleChangeImages}
              />
            </div>
          </div>
        </div>

        <div className="status_footer">
          <button
            className="btn btn-secondary w-100"
            type="submit"
            style={{
              backgroundColor: theme ? "rgb(255,255,255)" : "rgb(16,16,16)",
              color: theme ? "rgb(16,16,16)" : "rgb(255,255,255)",
            }}
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default StatusModal;
