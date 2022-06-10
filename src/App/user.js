export const getUserDataFunc = async () => {
  try {
    let value;
    value = await localStorage.getItem("token");
    if (value) return value;
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
