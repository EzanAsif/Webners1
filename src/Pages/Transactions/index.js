import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppLayout } from "../../Components/Layouts/AppLayout";
import IndividualTransaction from "../../Components/IndividualTransaction";
import "./styles.css";
import { CircularProgress } from "@mui/material";
import { newTokenFetch } from "../../App/Helper/newTokenFetch";
import {
  GetTransactions,
  firstFetchFunc,
} from "../../Store/Reducers/Transactions";
import { RefreshToken } from "../../Store/Reducers/AuthReducer";

const HomeScreen = () => {
  const { transactions } = useSelector((state) => state);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (transactions.transactionsList && transactions.transactionsList.length) {
      setData(transactions.transactionsList);
    } else {
      setData([]);
    }
  }, [transactions.transactionsList]);

  useEffect(() => {
    if (!transactions.firstFetch) {
      dispatch(GetTransactions())
        .unwrap()
        .then((res) => {
          if (res.status === "rejected") {
            if (res.message === "Auth failed") {
              newTokenFetch(dispatch, RefreshToken, () => {
                dispatch(GetTransactions())
                  .unwrap()
                  .then(() => {
                    dispatch(firstFetchFunc());
                  })
                  .catch((e) => e);
              });
            }
          } else {
            dispatch(firstFetchFunc());
            return res;
          }
        })
        .catch((e) => {
          return e;
        });
    }
  }, []);

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
                transactionStatus={obj.status}
                type={obj.type}
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
        )}
      </div>
    </AppLayout>
  );
};

export default HomeScreen;
