export const getUserDataFunc = async () => {
  try {
    let token;
    let user;
    let refreshToken;
    token = localStorage.getItem("token");
    user = localStorage.getItem("user");
    refreshToken = localStorage.getItem("refreshToken");
    token = await JSON.parse(token);
    user = await JSON.parse(user);
    refreshToken = await JSON.parse(refreshToken);
    return { token, user, refreshToken };
  } catch (e) {
    return e;
  }
};

export const setUserDataFunc = async (token, userData, refreshToken) => {
  await localStorage.setItem("user", JSON.stringify(userData));
  await localStorage.setItem("token", JSON.stringify(token));
  await localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
  let userToken = await localStorage.getItem("token");
  let userDataRes = await localStorage.getItem("user");
  let refreshTokenRes = await localStorage.getItem("refreshToken");
  return { userToken, userDataRes, refreshTokenRes };
};
