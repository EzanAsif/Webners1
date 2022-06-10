import React from "react";
import "./styles.css";
import WithdrawIcon from "../../Assets/withdraw.png";
import DepositIcon from "../../Assets/deposit.png";

const index = ({ isDeposit = false, dateTime, transactionAmount }) => {
  return (
    <div
      style={{
        margin: "20px 0px",
        padding: "15px 10px",
        backgroundColor: "#f3f3f3",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "5px",
      }}
    >
      <div className="indivTransIcon">
        <img src={isDeposit ? DepositIcon : WithdrawIcon} />
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

export default index;
