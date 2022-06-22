import React from "react";
import "./styles.css";
import CtaBtn from "../CtaBtn";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AddCardIcon from "@mui/icons-material/AddCard";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

const IndividualTransaction = ({
  isDeposit = false,
  isBonus = false,
  dateTime,
  transactionAmount,
  transactionStatus = "pending",
  isPendingCard,
}) => {
  return (
    <div
      className={`indivTransCard ${
        isDeposit ? "deposit" : isBonus ? "bonus" : "withdraw"
      }`}
    >
      <div className="indivTransactionUpperContainer">
        <div className={`indivTransIcon ${isDeposit ? "deposit" : "withdraw"}`}>
          {isDeposit ? (
            <AddCardIcon />
          ) : isBonus ? (
            <CardGiftcardIcon />
          ) : (
            <ArrowUpwardIcon style={{ transform: "rotate(225deg)" }} />
          )}
        </div>
        <div className="indivTransDetails">
          <div className="indivTransType">
            {isDeposit ? "Deposit" : "Withdraw"}
            <div
              className={`transactionStatus ${
                transactionStatus == "pending"
                  ? "pending"
                  : transactionStatus == "success"
                  ? "success"
                  : transactionStatus == "rejected"
                  ? "rejected"
                  : null
              }`}
            >
              {transactionStatus}
            </div>
          </div>
          <div className="indivTransDateTime">{dateTime}</div>
        </div>
        <div className="indivTransAmount">{transactionAmount}</div>
      </div>
      {isPendingCard ? (
        <div className="pendingTransactions">
          <CtaBtn
            style={{ width: "47%" }}
            variant="outlined"
            label="Reject"
            color={"error"}
          />
          <CtaBtn
            style={{ width: "47%" }}
            variant="contained"
            label="Approve"
          />
        </div>
      ) : null}
    </div>
  );
};

export default IndividualTransaction;
