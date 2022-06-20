import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppLayout } from "../../Components/Layouts/AppLayout";
import { removeuserDataFromLocalStorage } from "../../Store/Reducers/AuthReducer";
import { clearTransactionsList } from "../../Store/Reducers/Transactions";
import { useNavigate } from "react-router-dom";
import { UserLogout } from "../../Store/Reducers/AuthReducer";
import { Backdrop, Button, CircularProgress, Typography } from "@mui/material";
import StockProfileImg from "../../Assets/profile-pic.jpeg";
import LogoutIcon from "@mui/icons-material/Logout";
import "./styles.css";
const HomeScreen = ({ setMuiAlert, muiAlert }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth, transactions } = useSelector((state) => state);

  const [userDescription, setUserDescription] = React.useState([
    { label: "Name", value: "" },
    { label: "Email", value: "" },
    { label: "Phone", value: "" },
  ]);

  React.useEffect(() => {
    if (auth.userData && auth.userData.user) {
      let uData = auth.userData.user;
      setUserDescription([
        {
          label: "Name",
          value: uData.name,
        },
        {
          label: "Email",
          value: uData.email,
        },
        {
          label: "Phone",
          value: uData.phoneNo,
        },
      ]);
    }
  }, [auth]);

  const logout = () => {
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
  };

  console.log(userDescription);
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={auth.status === "Pending" || transactions.status === "Pending"}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <AppLayout>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "0px auto",
            width: "90%",
          }}
        >
          <div className="placeholder-profile-pic">
            <img
              src={StockProfileImg}
              style={{ width: "100%", height: "100%" }}
              alt="profile page"
            />
          </div>
          <div
            style={{ backgroundColor: "#1976d2", margin: "10px 0px" }}
            className="currentBalanceContainer"
          >
            <Typography
              align="center"
              sx={{ fontSize: 12, margin: "5px 0px" }}
              color="white"
              gutterBottom
            >
              Current Invested Balance
            </Typography>
            <Typography
              sx={{ marginBottom: "5px !important" }}
              align="center"
              className="currentBalance"
              color="white"
            >
              ${transactions.status === "Ok" && auth.userData.user.balance}
            </Typography>
          </div>
          <div className="profile-description">
            {userDescription &&
              userDescription.map((obj, index) => {
                return (
                  <div className="indiv-profile-desc" key={index}>
                    <div className="profile-desc-label">
                      <Typography
                        sx={{ color: "text.secondary", fontSize: "14px" }}
                      >
                        {obj.label}
                      </Typography>
                    </div>
                    <div className="profile-desc-value">
                      <Typography
                        sx={{
                          color: "text.primary",
                          fontSize: "14px",
                          marginLeft: "10px",
                        }}
                      >
                        {obj.value}
                      </Typography>
                    </div>
                  </div>
                );
              })}
          </div>
          <Button
            onClick={logout}
            variant="outlined"
            color="error"
            endIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </div>
      </AppLayout>
    </>
  );
};

export default HomeScreen;
