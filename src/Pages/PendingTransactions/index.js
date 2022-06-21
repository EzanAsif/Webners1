import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppLayout } from "../../Components/Layouts/AppLayout";
import IndividualTransaction from "../../Components/IndividualTransaction";
import "./styles.css";
import { CircularProgress } from "@mui/material";

const PendingTransactions = ({ muiAlert, setMuiAlert }) => {
  const { transactions } = useSelector((state) => state);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (transactions.transactionsList && transactions.transactionsList.length) {
      setData(transactions.transactionsList);
    } else {
      setData([]);
    }
  }, [transactions]);

  return (
    <AppLayout>
      <h2>Pending Transactions</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "-webkit-fill-available",
          height: "max-content",
        }}
      >
        <IndividualTransaction
          dateTime={"6/20/2022, 5:44:49 AM"}
          transactionAmount={`+15$`}
          isDeposit={true}
          isPendingCard={true}
        />
        <IndividualTransaction
          dateTime={"6/20/2022, 5:44:49 AM"}
          transactionAmount={`-5$`}
          isDeposit={false}
          isPendingCard={true}
        />
        <IndividualTransaction
          dateTime={"6/20/2022, 5:44:49 AM"}
          transactionAmount={`+15$`}
          isDeposit={true}
          isPendingCard={true}
        />
        <IndividualTransaction
          dateTime={"6/20/2022, 5:44:49 AM"}
          transactionAmount={`-5$`}
          isDeposit={false}
          isPendingCard={true}
        />
        {/* {data.length ? (
          data.map((obj, index) => {
            return (
              <IndividualTransaction
                dateTime={obj.timeStamp}
                transactionAmount={`${obj.amount}$`}
                isDeposit={obj.type === "deposit" ? true : false}
                key={index}
              />
            );
          })
        ) : transactions.status === "Pending" ? (
          <CircularProgress
            style={{
              justifySelf: "center",
              alignSelf: "center",
              margin: "auto",
            }}
            color="inherit"
          />
        ) : (
          "no transaction found"
        )} */}
      </div>
    </AppLayout>
  );
};

export default PendingTransactions;
