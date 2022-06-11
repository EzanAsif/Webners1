import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppLayout } from "../../Components/Layouts/AppLayout";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Snackbar, Typography } from "@mui/material";
import "./styles.css";
import CtaBtn from "../../Components/CtaBtn";
import IndividualTransaction from "../../Components/IndividualTransaction";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const { auth } = useSelector((state) => state);
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={3000}
      >
        <Alert severity="info" sx={{ width: "100%" }}>
          Text Copied To Clipboard!
        </Alert>
      </Snackbar>
      <AppLayout>
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
            $3,293.46
          </Typography>
          <div className="depositWithdrawBtns">
            <CtaBtn
              label="Deposit"
              variant="outlined"
              className="indivDepositWithdrawBtn"
              size="large"
            />
            <CtaBtn
              label="Withdraw"
              className="indivDepositWithdrawBtn"
              variant="contained"
              size="large"
            />
          </div>
        </div>
        <div
          style={{
            margin: "30px auto 30px auto",
            padding: "0px 10px",
            backgroundColor: "#1976d2",
            borderRadius: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          className="shareRefCode"
        >
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
          {[1, 2, 3, 4, 5].map((obj, index) => {
            if (index % 2 == 0) {
              return (
                <IndividualTransaction
                  isDeposit={true}
                  dateTime="27th March Tue, 9:00pm"
                  transactionAmount="200$"
                  key={index}
                />
              );
            } else {
              return (
                <IndividualTransaction
                  dateTime="27th March Tue, 9:00pm"
                  transactionAmount="200$"
                  key={index}
                />
              );
            }
          })}
        </div>
      </AppLayout>
    </>
  );
};

export default HomeScreen;
