import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppLayout } from "../../Components/Layouts/AppLayout";
import IndividualTransaction from "../../Components/IndividualTransaction";
import "./styles.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
          <Accordion
            sx={{ border: "1.5px solid #c6c6c6", margin: "20px 0px" }}
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ background: "#f3f3f3" }}
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography>Pending Transactions</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ background: "#fafafa" }}>
              {[1, 2, 3, 4, 5].map((obj, index) => {
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
              })}
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{ border: "1.5px solid #c6c6c6" }}
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
            TransitionProps={{ unmountOnExit: true }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ background: "#f3f3f3" }}
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <Typography>All Transactions</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ background: "#fafafa" }}>
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
            </AccordionDetails>
          </Accordion>
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
