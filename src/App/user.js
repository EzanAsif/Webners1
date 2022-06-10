export const getUserDataFunc = async () => {
  try {
    let token;
    let user;
    token = await localStorage.getItem("token");
    user = await localStorage.getItem("user");
    token = JSON.parse(token)
    user = JSON.parse(user)
    if (token && user) return { token, user };
  } catch (e) {
    console.log(e);
  }
};

export const setUserDataFunc = async (token, userData) => {
  await localStorage.setItem("user", JSON.stringify(userData));
  await localStorage.setItem("token", JSON.stringify(token));
  let userToken = await localStorage.getItem("token");
  let userDataRes = await localStorage.getItem("user");
  return { userToken, userDataRes };
};
