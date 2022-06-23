import React, { useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { userDataFromLocalStorage } from "./Store/Reducers/AuthReducer";
import { getUserDataFunc } from "./App/user";
import AppRoutes from "./Navigation";
import { createTheme, Snackbar } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, IconButton } from "@mui/material";
import Slide from "@mui/material/Slide";

const UserAuthenticated = () => {
  return null;
};

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["Lato", "Poppins"],
    },
  });

  const [muiAlert, setMuiAlert] = useState({
    open: false,
    alertStatus: "",
    alertMessage: "",
  });
  function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
  }

  const dispatch = useDispatch();

  React.useEffect(() => {
    (async () => {
      let userData = localStorage.getItem("user");
      let refreshToken = localStorage.getItem("refreshToken");
      let token = localStorage.getItem("token");
      userData = await JSON.parse(userData);
      let res = { user: {} };
      try {
        refreshToken = await JSON.parse(refreshToken);
        token = await JSON.parse(token);
        res = { user: userData, refreshToken, token };
      } catch (e) {
        res = { user: userData, refreshToken, token };
      }
      console.log(res);
      if (res) {
        try {
          dispatch(userDataFromLocalStorage(res));
        } catch (e) {
          return e;
        }
      }
    })().catch((err) => {
      console.error(err);
    });
  }, [localStorage]);

  return (
    <>
      {/* <UserAuthenticated /> */}
      <ThemeProvider theme={theme}>
        {muiAlert.open && (
          <Snackbar
            TransitionComponent={TransitionRight}
            open={muiAlert.open}
            autoHideDuration={4000}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            onClose={() => {}}
          >
            <Alert
              // onClose={handleClose}
              severity={muiAlert.alertStatus}
              sx={{ width: "100%" }}
            >
              {muiAlert.alertMessage}
              <IconButton
                onClick={() => {
                  setMuiAlert({ ...muiAlert, open: false });
                }}
              >
                <CloseIcon />
              </IconButton>
            </Alert>
          </Snackbar>
        )}
        <AppRoutes muiAlert={muiAlert} setMuiAlert={setMuiAlert} />
      </ThemeProvider>
    </>
  );
}

export default App;
