import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Backdrop, Button, CircularProgress, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import "./styles.css";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";

const Withdraw = ({ setMuiAlert, muiAlert }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [amount, setAmount] = useState(location.state && location.state.amount);
  const { auth, transactions } = useSelector((state) => state);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open && auth.status == "Pending"}
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
            <div style={{ margin: "50px 0px" }}>
              <CurrencyTextField
                className="currency-input"
                variant="standard"
                value={amount}
                currencySymbol="$"
                minimumValue="0"
                maximumValue={
                  !transactions.balanceChanged
                    ? auth.userData && auth.userData.user
                      ? auth.userData.user.balance
                      : transactions.updatedBalance
                    : transactions.updatedBalance
                }
                outputFormat="number"
                decimalCharacter="."
                digitGroupSeparator=","
                onChange={(event, value) => {
                  setAmount(value);
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
              disabled={amount < 10}
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
