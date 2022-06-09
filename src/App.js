import React from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { userDataFromLocalStorage } from "./Store/Reducers/AuthReducer";
import { getUserDataFunc } from "./App/user";
import AppRoutes from "./Navigation";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const UserAuthenticated = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  React.useEffect(() => {
    (async () => {
      await getUserDataFunc().then((res) => {
        if (res) dispatch(userDataFromLocalStorage(res));
      });
    })().catch((err) => {
      console.error(err);
    });
  }, []);

  return null;
};

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["Lato", "poppins"],
    },
  });
  return (
    <>
      <UserAuthenticated />
      <ThemeProvider theme={theme}>
        <AppRoutes />
      </ThemeProvider>
    </>
  );
}

export default App;
