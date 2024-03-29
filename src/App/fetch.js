import axios from "axios";

export const postRequest = async (api, body) => {
  try {
    let token = localStorage.getItem("token");
    token = JSON.parse(token);
    const res = await axios.request({
      method: "POST",
      url: api,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: body,
    });
    return res.data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const authPostRequest = async (api, body) => {
  try {
    const res = await axios.request({
      method: "POST",
      url: api,
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getRequest = async (api, type) => {
  let token = localStorage.getItem("token");
  token = JSON.parse(token);
  const res = await axios.request({
    method: "GET",
    url: api,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const putRequest = async (api, body) => {
  try {
    let token = await localStorage.getItem("token");
    token = await JSON.parse(token);
    const res = await axios.request({
      method: "PUT",
      url: api,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: body,
    });
    return res.data;
  } catch (e) {
    return e;
  }
};

export const deleteRequest = async (api, body) => {
  const res = await fetch(api, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      //   Authorization: localStorage.getItem('token'),
    },

    body: JSON.stringify(body),
  });
  return await res.json();
};

export const getDataByBody = async (api, body) => {
  const res = await axios.request({
    method: "POST",
    url: api,
    headers: {
      //   Authorization: localStorage.getItem('token'),
    },
    data: body,
  });
  return await res.data;
};

export const getDataByBodyParams = async (api, body) => {
  const res = await axios.request({
    method: "GET",
    url: api,
    headers: {
      //   Authorization: localStorage.getItem('token'),
    },
    params: body,
  });
  return await res.data;
};
