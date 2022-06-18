import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppLayout } from "../../Components/Layouts/AppLayout";
import { removeuserDataFromLocalStorage } from "../../Store/Reducers/AuthReducer";
import { clearTransactionsList } from "../../Store/Reducers/Transactions";
import { useNavigate } from "react-router-dom";
import { UserLogout } from "../../Store/Reducers/AuthReducer";
import { Backdrop, CircularProgress } from "@mui/material";

const HomeScreen = ({ setMuiAlert, muiAlert }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state);
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open && auth.status === "Pending"}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <AppLayout>
        <h2>Profile</h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {[1, 24, 2, 45, 5, 25, 5, 42, 34, 24, 24, 2].map((obj, index) => {
            return (
              <button
                key={index}
                style={{ margin: "20px 0px" }}
                onClick={() => {
                  try {
                    let refreshToken = localStorage.getItem("refreshToken");
                    refreshToken = JSON.parse(refreshToken);
                    setOpen(true);
                    dispatch(UserLogout({ refreshToken }))
                      .unwrap()
                      .then(() => {
                        dispatch(clearTransactionsList());
                        setMuiAlert({
                          open: true,
                          alertStatus: "success",
                          alertMessage: "User Logout Success",
                        });
                        dispatch(removeuserDataFromLocalStorage());
                        setMuiAlert({ ...muiAlert, open: false });
                        navigate("/");
                      })
                      .catch();
                  } catch (e) {
                    alert(e);
                  }
                }}
              >
                Logout
              </button>
            );
          })}
        </div>
      </AppLayout>
    </>
  );
};

export default HomeScreen;
