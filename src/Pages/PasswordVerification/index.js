import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Backdrop,
  Button,
  CircularProgress,
  InputAdornment,
  Typography,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  WithdrawTransaction,
  GetTransactions,
} from "../../Store/Reducers/Transactions";
import { RefreshToken, GetUserBalance } from "../../Store/Reducers/AuthReducer";
import { newTokenFetch } from "../../App/Helper/newTokenFetch";
import showAlertAndLoader from "../../App/Helper/showAlertAndLoader";

const PasswordVerification = ({ setMuiAlert, muiAlert }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    auth,
    transactions: { status: transactionStatus },
  } = useSelector((state) => state);

  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const withdrawTransactionFunc = () => {
    let dateTime = new Date().toLocaleString();
    setOpen(true);
    dispatch(
      WithdrawTransaction({
        timeStamp: dateTime,
        amount: location.state.amount,
        refreshToken: JSON.parse(localStorage.getItem("refreshToken")),
        password: values.password,
      })
    )
      .unwrap()
      .then((res) => {
        if (res.status == "rejected") {
          if (res.message == "Auth failed") {
            newTokenFetch(dispatch, RefreshToken, () => {
              dispatch(
                WithdrawTransaction({
                  timeStamp: dateTime,
                  amount: location.state.amount,
                  refreshToken: JSON.parse(
                    localStorage.getItem("refreshToken")
                  ),
                  password: values.password,
                })
              )
                .unwrap()
                .then((result) => {
                  dispatch(GetUserBalance());
                  dispatch(GetTransactions());
                  showAlertAndLoader(
                    muiAlert,
                    setMuiAlert,
                    setOpen,
                    "success",
                    "Amount Withdrawn",
                    () => {
                      navigate("/");
                    }
                  );
                })
                .catch((e) => {
                  showAlertAndLoader(
                    muiAlert,
                    setMuiAlert,
                    setOpen,
                    "error",
                    `Error performing transaction - ${e.message}`
                  );
                });
              // dispatch(GetTransactions());
            });
          }
          if (res.message == "Invalid Password") {
            showAlertAndLoader(
              muiAlert,
              setMuiAlert,
              setOpen,
              "error",
              `Error performing transaction - Invalid Password`
            );
          }
        } else {
          dispatch(GetTransactions())
            .then((result) => {
              let { payload } = result;
              let res = payload;
              if (res.status == "rejected") {
                if (res.message == "Auth failed") {
                  newTokenFetch(dispatch, RefreshToken, () => {
                    dispatch(GetUserBalance());
                    dispatch(GetTransactions());
                  });
                }
              } else {
                dispatch(GetUserBalance());
                dispatch(GetTransactions());
                showAlertAndLoader(
                  muiAlert,
                  setMuiAlert,
                  setOpen,
                  "success",
                  "Amount Withdrawn",
                  () => {
                    navigate("/");
                  }
                );
              }
            })
            .catch((e) => {
              return(e);
            });
        }
      })
      .catch((e) => {
        showAlertAndLoader(
          muiAlert,
          setMuiAlert,
          setOpen,
          "error",
          `Error performing transaction - ${e.message}`
        );
      });
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={
          open || auth.status == "Pending" || transactionStatus == "Pending"
        }
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="App-wrapper">
        <div className="withdraw-deposit-page">
          <div className="withdraw-deposit-header">
            <div className="back-icon">
              <ArrowBackRoundedIcon
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/withdraw", {
                    state: { amount: location.state.amount },
                  });
                }}
              />
            </div>
            <div className="page-heading">Verify Password</div>
          </div>
          <div className="amount-input-div">
            <Typography align="center" sx={{ color: "text.primary" }}>
              Please Verify Your Password
            </Typography>
            <div style={{ margin: "50px 0px" }}>
              <OutlinedInput
                size="small"
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                placeholder="Enter your password here"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>
            <Button
              disabled={!values.password.length}
              size="large"
              variant="contained"
              fullWidth
              onClick={withdrawTransactionFunc}
            >
              Verify
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordVerification;
