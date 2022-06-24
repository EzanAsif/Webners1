import React from "react";
import "./styles.css";
import CtaBtn from "../CtaBtn";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AddCardIcon from "@mui/icons-material/AddCard";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

const IndividualTransaction = ({
  type,
  dateTime,
  transactionAmount,
  transactionStatus = "pending",
  isPendingCard, //to show accept/reject buttons
  approveTransactionFunc,
  rejectTransactionFunc,
}) => {
  return (
    <div
      className={`indivTransCard ${
        type == "deposit"
          ? "deposit"
          : type == "bonus"
          ? "bonus"
          : type == "withdraw" && "withdraw"
      }`}
    >
      <div className="indivTransactionUpperContainer">
        <div
          className={`indivTransIcon ${
            type == "deposit"
              ? "deposit"
              : type == "withdraw"
              ? "withdraw"
              : type == "bonus" && "bonus"
          }`}
        >
          {type == "deposit" ? (
            <AddCardIcon />
          ) : type == "bonus" ? (
            <CardGiftcardIcon />
          ) : (
            type == "withdraw" && (
              <ArrowUpwardIcon style={{ transform: "rotate(225deg)" }} />
            )
          )}
        </div>
        <div className="indivTransDetails">
          <div className="indivTransType">
            {type}
            <div
              className={`transactionStatus ${
                transactionStatus == "pending"
                  ? "pending"
                  : transactionStatus == "successful"
                  ? "success"
                  : transactionStatus == "rejected"
                  ? "rejected"
                  : null
              }`}
            >
              {transactionStatus}
            </div>
          </div>
          <div className="indivTransDateTime">{new Date(dateTime).toLocaleString('en-US')}</div>
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
            onClickFunc={rejectTransactionFunc}
          />
          <CtaBtn
            style={{ width: "47%" }}
            variant="contained"
            label="Approve"
            onClickFunc={approveTransactionFunc}
          />
        </div>
      ) : null}
    </div>
  );
};

export default IndividualTransaction;
