export const newTokenFetch = (dispatch, RefreshToken, continuedFunc) => {
  dispatch(
    RefreshToken({
      refreshToken: JSON.parse(localStorage.getItem("refreshToken")),
    })
  )
    .unwrap()
    .then((res) => {
      console.log(res, "res");
      let newRefreshToken = res.token;
      newRefreshToken = JSON.stringify(newRefreshToken);
      localStorage.setItem("token", newRefreshToken);
      if (continuedFunc) {
        continuedFunc();
      }
    })
    .catch((e) => {
      console.log(e, "e");
      return e;
    });
};
