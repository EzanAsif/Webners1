import React from "react";
import { useDispatch } from "react-redux";
import { AppLayout } from "../../Components/Layouts/AppLayout";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import "./styles.css";
import CtaBtn from "../../Components/CtaBtn";
import IndividualTransaction from "../../Components/IndividualTransaction";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
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
            style={{ width: "48% !important" }}
            size="small"
          />
          <CtaBtn
            label="Withdraw"
            variant="contained"
            style={{ width: "48% !important" }}
            size="small"
          />
        </div>
      </div>
      <div className="latestTransactions">
        <Typography gutterBottom align="left" variant="h6">
          Latest Transactions
        </Typography>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((obj, index) => {
          return <IndividualTransaction key={index} />;
        })}
      </div>
    </AppLayout>
  );
};

export default HomeScreen;
