import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Backdrop, Button, CircularProgress, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import "./styles.css";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { DepositTransaction, GetTransactions } from "../../Store/Reducers/Transactions";
import { RefreshToken } from "../../Store/Reducers/AuthReducer";

const Deposit = ({ setMuiAlert, muiAlert }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [amount, setAmount] = useState(location.state && amount);
  const {
    auth,
    transactions: { status: transactionStatus },
  } = useSelector((state) => state);

  const showAlertAndLoader = (alertType, alertMsg, func = () => {}) => {
    setMuiAlert({
      open: true,
      alertStatus: `${alertType}`,
      alertMessage: `${alertMsg}`,
    });
    setTimeout(() => {
      setMuiAlert({ ...muiAlert, open: false });
      setOpen(false);
      if (func) func();
    }, 2000);
  };

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
        dispatch(
          DepositTransaction({
            timeStamp: dateTime,
            amount: amount,
            refreshToken: JSON.parse(localStorage.getItem("refreshToken")),
          })
        )
          .unwrap()
          .then((result) => {
            showAlertAndLoader("success", "Amount Deposited", () => {
              navigate("/");
            });
          })
          .catch((e) => {
            showAlertAndLoader(
              "error",
              `Error performing transaction - ${e.message}`
            );
          });
      })
      .catch((e) => {
        showAlertAndLoader(
          "error",
          `Error performing transaction - ${e.message}`
        );
      });
  };

  const newTokenFetchForTransaction = (dateTime) => {
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
            return result;
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const DepositTransacFunc = () => {
    let dateTime = new Date().toLocaleString();
    setOpen(true);
    dispatch(
      DepositTransaction({
        timeStamp: dateTime,
        amount: amount,
        refreshToken: JSON.parse(localStorage.getItem("refreshToken")),
      })
    )
      .unwrap()
      .then((res) => {
        if (res.status == "rejected") {
          if (res.message == "Auth failed") {
            newTokenFetch(dateTime);
          }
          if (res.message == "Invalid Password") {
            showAlertAndLoader(
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
                  newTokenFetchForTransaction();
                }
              } else {
                return res;
              }
            })
            .catch((e) => {
              console.log(e);
            });
          showAlertAndLoader("success", "Amount Deposited", () => {
            navigate("/");
          });
        }
      })
      .catch((e) => {
        showAlertAndLoader(
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
                  navigate("/");
                }}
              />
            </div>
            <div className="page-heading">Deposit</div>
          </div>
          <div className="amount-input-div">
            <Typography align="center" sx={{ color: "text.primary" }}>
              Enter amount to Deposit
            </Typography>
            <div style={{ margin: "50px 0px" }}>
              <CurrencyTextField
                className="currency-input"
                variant="standard"
                value={amount}
                currencySymbol="$"
                minimumValue="0"
                outputFormat="number"
                decimalCharacter="."
                digitGroupSeparator=","
                onChange={(event, value) => {
                  setAmount(value);
                }}
              />
            </div>
            <Button
              size="large"
              onClick={DepositTransacFunc}
              disabled={amount < 10}
              variant="contained"
              fullWidth
            >
              Deposit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Deposit;
