import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppLayout } from "../../Components/Layouts/AppLayout";
import { removeuserDataFromLocalStorage } from "../../Store/Reducers/AuthReducer";
import { useNavigate } from "react-router-dom";
import IndividualTransaction from "../../Components/IndividualTransaction";
import "./styles.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AddCardIcon from "@mui/icons-material/AddCard";
import { CircularProgress } from "@mui/material";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      <h2>Transactions</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "-webkit-fill-available",
          height: "max-content",
        }}
      >
        {data.length ? (
          data.map((obj, index) => {
            return (
              <IndividualTransaction
                dateTime={obj.timeStamp}
                transactionAmount={`${obj.amount}$`}
                isDeposit={obj.type == "deposit" ? true : false}
                key={index}
              />
            );
          })
        ) : transactions.status == "Pending" ? (
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
        )}
      </div>
    </AppLayout>
  );
};

export default HomeScreen;
