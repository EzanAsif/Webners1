import React from "react";
import "./styles.css";
// import WithdrawIcon from "../../Assets/withdraw.png";
// import DepositIcon from "../../Assets/deposit.png";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AddCardIcon from "@mui/icons-material/AddCard";

const IndividualTransaction = ({
  isDeposit = false,
  dateTime,
  transactionAmount,
}) => {
  return (
    <div className={`indivTransCard ${isDeposit ? "deposit" : "withdraw"}`}>
      <div className={`indivTransIcon ${isDeposit ? "deposit" : "withdraw"}`}>
        {isDeposit ? (
          <AddCardIcon />
        ) : (
          <ArrowUpwardIcon style={{ transform: "rotate(225deg)" }} />
        )}
      </div>
      <div className="indivTransDetails">
        <div className="indivTransType">
          {isDeposit ? "Deposit" : "Withdraw"}
        </div>
        <div className="indivTransDateTime">{dateTime}</div>
      </div>
      <div className="indivTransAmount">{transactionAmount}</div>
    </div>
  );
};

export default IndividualTransaction;
