import React, { useState } from "react";
import {  useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
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

const Withdraw = () => {
  const [open] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [amount, setAmount] = useState(
    location.state ? location.state.amount : null
  );
  const { auth, transactions } = useSelector((state) => state);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open && auth.status === "Pending"}
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
            <div className="page-heading">Withdraw</div>
          </div>
          <div className="amount-input-div">
            <Typography align="center" sx={{ color: "text.primary" }}>
              Enter amount to withdraw
            </Typography>
            <div style={{ margin: "50px 0px", width : '100%' }}>
              <Input
                className="currency-input"
                fullWidth
                type="number"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                onChange={(e) => {
                  console.log(e.target);
                  console.log(e.target.value);
                  let val = e.target.value;
                  val = parseInt(val);
                  setAmount(val);
                  if (val > auth.userData.user.balance) {
                    setAmount(auth.userData.user.balance);
                  }
                }}
                disabled={
                  !auth.userData.user.balance || auth.userData.user.balance < 0
                }
                value={amount}
                inputProps={{
                  pattern: "^0[0-9].*$",
                  type: "number",
                  min: 10,
                  max:
                    auth.userData &&
                    auth.userData.user &&
                    auth.userData.user.balance,
                }}
              />
              <Typography
                align="center"
                sx={{
                  color: "text.primary",
                  fontSize: 12,
                  marginTop: "15px",
                  fontFamily: "poppins",
                }}
              >
                Your balance is : $
                {!transactions.balanceChanged
                  ? auth.userData.user.balance
                  : transactions.updatedBalance}
              </Typography>
            </div>
            <Button
              size="large"
              onClick={() => {
                navigate("/verify-password", { state: { amount } });
              }}
              disabled={amount < 5 || amount > auth.userData.user.balance}
              variant="contained"
              fullWidth
            >
              Withdraw
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Withdraw;
