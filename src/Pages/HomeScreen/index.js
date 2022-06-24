import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppLayout } from "../../Components/Layouts/AppLayout";
import { Link, useNavigate } from "react-router-dom";
import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import "./styles.css";
import CtaBtn from "../../Components/CtaBtn";
import IndividualTransaction from "../../Components/IndividualTransaction";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { GetUserBalance, RefreshToken } from "../../Store/Reducers/AuthReducer";
import {
  GetTransactions,
  firstFetchFunc,
} from "../../Store/Reducers/Transactions";
import { newTokenFetch } from "../../App/Helper/newTokenFetch";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const { auth, transactions, metamaskAccount } = useSelector((state) => state);
  const [data, setData] = useState([]);
  const isMounted = useRef(false);

  const { address } = metamaskAccount.account;

  useEffect(() => {
    if (
      isMounted.current === false &&
      !transactions.transactionsList.length &&
      transactions.firstFetch === false
    ) {
      dispatch(GetUserBalance())
        .unwrap()
        .then((res) => {
          isMounted.current = true;
          if (res.status === "rejected") {
            if (res.message === "Auth failed") {
              newTokenFetch(dispatch, RefreshToken, () => {
                dispatch(GetUserBalance());
                if (!transactions.length) {
                  dispatch(GetTransactions());
                  dispatch(firstFetchFunc());
                }
              });
            }
          } else {
            if (!transactions.length) {
              dispatch(GetTransactions());
              dispatch(firstFetchFunc());
            }
            return res;
          }
        })
        .catch((e) => {
          return e;
        });
    } else {
      // dispatch(GetUserBalance());
    }
  }, [auth.userData.user]);

  useEffect(() => {
    if (transactions.transactionsList && transactions.transactionsList.length) {
      let latestTransactions = transactions.transactionsList;
      latestTransactions = latestTransactions.slice(0, 5);
      setData(latestTransactions);
    } else {
      setData([]);
    }
  }, [transactions.transactionsList]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={auth.status === "Pending" || transactions.status === "Pending"}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        anchorOrigin={{ vertical: "middle", horizontal: "center" }}
        open={open}
        autoHideDuration={3000}
      >
        <Alert severity="info" sx={{ width: "100%" }}>
          Text Copied To Clipboard!
        </Alert>
      </Snackbar>
      <AppLayout>
        {auth.userData.user && auth.userData.user.name && (
          <div style={{ margin: "20px 0px" }}>
            <Typography
              align="left"
              sx={{
                fontSize: 16,
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
              }}
              color="text.secondary"
              gutterBottom
            >
              Hi,
              <Typography
                variant="h6"
                align="left"
                sx={{ fontSize: 18, marginBottom: 0, marginLeft: "5px" }}
                color="text.primary"
                gutterBottom
              >
                {auth.userData.user.name}
              </Typography>
            </Typography>
          </div>
        )}
        <div className="currentBalanceContainer">
          <Typography
            align="center"
            sx={{ fontSize: 12, margin: "5px 0px" }}
            color="text.secondary"
            gutterBottom
          >
            Current Invested Balance
          </Typography>
          <Typography
            align="center"
            className="currentBalance"
            color="text.primary"
            gutterBottom
          >
            ${transactions.status === "Ok" && auth.userData.user.balance}
          </Typography>
          <div className="depositWithdrawBtns">
            <CtaBtn
              label="Deposit"
              variant="outlined"
              className="indivDepositWithdrawBtn"
              size="large"
              onClickFunc={() => {
                if (address) {
                  navigate("/deposit");
                } else {
                  alert("Connect wallet first!")
                }
              }}
            />
            <CtaBtn
              label="Withdraw"
              className="indivDepositWithdrawBtn"
              variant="contained"
              size="large"
              onClickFunc={() => {
                if (address) {
                  navigate("/withdraw");
                } else {
                  alert("Connect wallet first!")
                }
              }}
            />
          </div>
        </div>
        <div className="shareRefCode">
          <Typography
            align="center"
            sx={{ fontSize: 12, margin: "5px 0px" }}
            style={{ margin: "20px auto" }}
            color="#fff"
          >
            Refer your friends and earn bonuses!
          </Typography>
          {auth.userData.user && auth.userData.user.email && (
            <Button
              onClick={() => {
                navigator.clipboard.writeText(auth.userData.user._id);
                setOpen(true);
                setTimeout(() => {
                  setOpen(false);
                }, 3000);
              }}
              style={{
                color: "white",
                borderColor: "white",
                margin: "0px auto 20px auto",
              }}
              variant="outlined"
              endIcon={<ContentCopyIcon color="white" />}
            >
              {auth.userData.user._id && auth.userData.user._id.slice(0, 12)}...
            </Button>
          )}
        </div>
        <div className="latestTransactions">
          <div className="header">
            <Typography
              gutterBottom
              align="left"
              style={{ fontSize: 18, fontWeight: "500" }}
            >
              Latest Transactions
            </Typography>
            <Link to="/transactions">See All</Link>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxHeight: "-webkit-fill-available",
              height: "max-content",
            }}
          >
            {data.length ? (
              data.map((obj, index) => {
                return (
                  <IndividualTransaction
                    dateTime={obj.timeStamp}
                    transactionAmount={`${obj.amount}$`}
                    transactionStatus={obj.status}
                    type={obj.type}
                    key={index}
                  />
                );
              })
            ) : transactions.status === "Pending" ? (
              <CircularProgress
                style={{
                  justifySelf: "center",
                  alignSelf: "center",
                  margin: "20px auto",
                }}
                color="inherit"
              />
            ) : (
              "no transaction found"
            )}
          </div>
        </div>
      </AppLayout>
    </>
  );
};

export default HomeScreen;
