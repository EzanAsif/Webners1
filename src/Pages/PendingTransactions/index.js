import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppLayout } from "../../Components/Layouts/AppLayout";
import IndividualTransaction from "../../Components/IndividualTransaction";
import "./styles.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AppHeader from "../../Components/AppHeader/AppHeader";

const PendingTransactions = ({ muiAlert, setMuiAlert }) => {
  const { transactions } = useSelector((state) => state);
  const [data, setData] = useState([]);

  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    if (transactions.transactionsList && transactions.transactionsList.length) {
      setData(transactions.transactionsList);
    } else {
      setData([]);
    }
  }, [transactions]);

  const [transactionType, setTransactionType] = useState("pending");

  const handleClick = (e) => {
    setTransactionType(e.target.name);
  };

  return (
    <>
      <AppHeader />
      <div style={{ height: "95vh" }} className="App-wrapper">
        <h2>Transactions</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxHeight: "-webkit-fill-available",
            height: "max-content",
          }}
        >
          <div style={{ display: "flex", justifyContent: "start" }}>
            <Button
              onClick={handleClick}
              name="all"
              type="all"
              label="All Transactions"
              size="small"
              variant={transactionType == "all" ? "contained" : "outlined"}
            >
              All Transactions
            </Button>
            <Button
              sx={{ marginLeft: "10px" }}
              onClick={handleClick}
              name="pending"
              type="pending"
              size="small"
              variant={transactionType == "pending" ? "contained" : "outlined"}
            >
              Pending
            </Button>
          </div>
          {transactionType == "pending" ? (
            [1, 2, 3, 4, 5].map((obj, index) => {
              return (
                <IndividualTransaction
                  key={index}
                  dateTime={"6/20/2022, 5:44:49 AM"}
                  transactionAmount={`+15$`}
                  isDeposit={index == 1 || index == 4 ? false : true}
                  isPendingCard={true}
                  transactionStatus="pending"
                />
              );
            })
          ) : (
            <>
              <IndividualTransaction
                dateTime={"6/20/2022, 5:44:49 AM"}
                transactionAmount={`-5$`}
                isDeposit={false}
                transactionStatus="rejected"
              />
              <IndividualTransaction
                dateTime={"6/20/2022, 5:44:49 AM"}
                transactionAmount={`+15$`}
                isDeposit={true}
                transactionStatus="pending"
              />
              <IndividualTransaction
                dateTime={"6/20/2022, 5:44:49 AM"}
                transactionAmount={`+15$`}
                isDeposit={true}
                transactionStatus="success"
              />
              <IndividualTransaction
                dateTime={"6/20/2022, 5:44:49 AM"}
                transactionAmount={`-5$`}
                isDeposit={false}
                transactionStatus="success"
              />
              <IndividualTransaction
                dateTime={"6/20/2022, 5:44:49 AM"}
                transactionAmount={`-5$`}
                isDeposit={false}
                transactionStatus="success"
              />
            </>
          )}
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
      </div>
    </>
  );
};

export default PendingTransactions;
