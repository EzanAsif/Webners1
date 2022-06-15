import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Backdrop, Button, CircularProgress, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import "./styles.css";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import {
  DepositTransaction,
  GetTransactions,
} from "../../Store/Reducers/Transactions";
import { RefreshToken, GetUserBalance } from "../../Store/Reducers/AuthReducer";
import { newTokenFetch } from "../../App/Helper/newTokenFetch";
import showAlertAndLoader from "../../App/Helper/showAlertAndLoader";

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
            newTokenFetch(dispatch, RefreshToken, () => {
              dispatch(
                DepositTransaction({
                  timeStamp: dateTime,
                  amount: amount,
                  refreshToken: JSON.parse(
                    localStorage.getItem("refreshToken")
                  ),
                })
              )
                .unwrap()
                .then((result) => {
                  showAlertAndLoader(
                    muiAlert,
                    setMuiAlert,
                    setOpen,
                    "success",
                    "Amount Deposited",
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
              dispatch(GetTransactions());
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
                  newTokenFetch(
                    dispatch,
                    RefreshToken,
                    dispatch(GetTransactions())
                  );
                }
              } else {
                return res;
              }
            })
            .catch((e) => {
              return(e);
            });
          dispatch(GetUserBalance());
          showAlertAndLoader(
            muiAlert,
            setMuiAlert,
            setOpen,
            "success",
            "Amount Deposited",
            () => {
              navigate("/");
            }
          );
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
