import React, { useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  userDataFromLocalStorage,
  RefreshToken,
} from "./Store/Reducers/AuthReducer";
import { GetTransactions } from "./Store/Reducers/Transactions";
import { getUserDataFunc } from "./App/user";
import AppRoutes from "./Navigation";
import { createTheme, Snackbar } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, IconButton } from "@mui/material";
import Slide from "@mui/material/Slide";

const UserAuthenticated = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const newTokenFetch = (dateTime) => {
    dispatch(
      RefreshToken({
        refreshToken: JSON.parse(localStorage.getItem("refreshToken")),
      })
    )
      .unwrap()
      .then((res) => {
        let newRefreshToken = res.token;
        newRefreshToken = JSON.stringify(newRefreshToken);
        localStorage.setItem("token", newRefreshToken);
        dispatch(GetTransactions())
          .unwrap()
          .then((result) => {
            console.log(result);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  React.useEffect(() => {
    (async () => {
      await getUserDataFunc().then((res) => {
        console.log(res, "localstoragedata");
        if (res) {
          try {
            dispatch(userDataFromLocalStorage(res));
            dispatch(GetTransactions())
              .then((result) => {
                let { payload } = result;
                let res = payload;
                if (res.status == "rejected") {
                  if (res.message == "Auth failed") {
                    newTokenFetch();
                  }
                } else {
                  console.log(res, "res2");
                }
              })
              .catch((e) => {
                console.log(e);
              });
          } catch (e) {
            console.log(e);
          }
        }
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

  return (
    <>
      <UserAuthenticated />
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
