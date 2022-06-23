import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Backdrop,
  Button,
  CircularProgress,
  Input,
  InputAdornment,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import "./styles.css";
import {
  DepositTransaction,
  GetTransactions,
} from "../../Store/Reducers/Transactions";
import { RefreshToken } from "../../Store/Reducers/AuthReducer";
import { newTokenFetch } from "../../App/Helper/newTokenFetch";
import showAlertAndLoader from "../../App/Helper/showAlertAndLoader";

const Deposit = ({ setMuiAlert, muiAlert }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const {
    auth,
    transactions: { status: transactionStatus },
  } = useSelector((state) => state);

  const DepositTransacFunc = () => {
    let dateTime = new Date().toLocaleString();
    setOpen(true);
    dispatch(
      DepositTransaction({
        address: "0xC75aE46697021fd2eB58F55e44357CB3d485A788",
        timeStamp: dateTime,
        amount: amount,
        refreshToken: JSON.parse(localStorage.getItem("refreshToken")),
      })
    )
      .unwrap()
      .then((res) => {
        if (res.status === "rejected") {
          if (res.message === "Auth failed") {
            newTokenFetch(dispatch, RefreshToken, () => {
              dispatch(
                DepositTransaction({
                  address: "0xC75aE46697021fd2eB58F55e44357CB3d485A788",
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
              // dispatch(GetUserBalance());
            });
          }
          if (res.message === "Invalid Password") {
            showAlertAndLoader(
              muiAlert,
              setMuiAlert,
              setOpen,
              "error",
              `Error performing transaction - Invalid Password`
            );
          }
        } else {
          // dispatch(GetUserBalance());
          dispatch(GetTransactions())
            .then((result) => {
              let { payload } = result;
              let res = payload;
              if (res.status === "rejected") {
                if (res.message === "Auth failed") {
                  newTokenFetch(dispatch, RefreshToken, () => {
                    // dispatch(GetUserBalance());
                    dispatch(GetTransactions());
                  });
                }
              } else {
                return res;
              }
            })
            .catch((e) => {
              return e;
            });
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
  console.log(amount);
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={
          open || auth.status === "Pending" || transactionStatus === "Pending"
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
            <div style={{ margin: "50px 0px", width: "100%" }}>
              <Input
                className="currency-input"
                variant="standard"
                type="number"
                fullWidth
                id="input-with-icon-adornment"
                onChange={(e) => {
                  let val = e.target.value;
                  val = parseInt(val);
                  setAmount(val);
                }}
                inputProps={{
                  type: "number",
                  min: 10,
                  max: 10000,
                }}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
              />
            </div>
            <Button
              size="large"
              onClick={DepositTransacFunc}
              disabled={!amount || amount < 10}
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
