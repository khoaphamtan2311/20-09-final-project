import { GLOBALTYPES } from "./globalTypes";
import { postDataAPI } from "../../utils/fetchData";
import valid from "../../utils/valid";
import { apiService } from "../../utils/fetchData";

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await postDataAPI("login", data);
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });
    localStorage.setItem("firstLogin", true);
    window.localStorage.setItem("accessToken", res.data.access_token);
    apiService.defaults.headers.common.Authorization = `Bearer ${res.data.access_token}`;

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg,
      },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response?.data?.msg,
      },
    });
  }
};

export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin");
  if (firstLogin) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    try {
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          isInitialized: false,
        },
      });
      const res = await postDataAPI("refresh_token");
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
          isInitialized: true,
        },
      });

      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response?.data?.msg,
        },
      });
    }
  }
};

export const register = (data) => async (dispatch) => {
  const check = valid(data);
  if (check.errLength > 0)
    return dispatch({ type: GLOBALTYPES.ALERT, payload: check.errMsg });

  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await postDataAPI("register", data);
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });

    localStorage.setItem("firstLogin", true);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg,
      },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const validateResetToken =
  ({ token }) =>
  async (dispatch) => {
    try {
      const body = { token };
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      const res = await postDataAPI("validate", body);
      dispatch({ type: GLOBALTYPES.ALERT, payload: { msg: res.data.msg } });
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          loading: false,
        },
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("firstLogin");
    await postDataAPI("logout");
    window.location.href = "/";
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const requestReset = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    await postDataAPI("reset_request", data);
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
  } catch (error) {}
};
