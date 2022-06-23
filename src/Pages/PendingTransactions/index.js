import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import IndividualTransaction from "../../Components/IndividualTransaction";
import "./styles.css";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import AppHeader from "../../Components/AppHeader/AppHeader";
import {
  GetPendingTransactions,
  AdminGetAllTransactions,
  ApproveTransaction,
  RejectTransaction,
  clearTransactionsList,
} from "../../Store/Reducers/Transactions";
import { newTokenFetch } from "../../App/Helper/newTokenFetch";
import {
  RefreshToken,
  removeuserDataFromLocalStorage,
  UserLogout,
} from "../../Store/Reducers/AuthReducer";
import showAlertAndLoader from "../../App/Helper/showAlertAndLoader";
import { useNavigate } from "react-router-dom";

const PendingTransactions = ({ muiAlert, setMuiAlert }) => {
  const { auth, transactions } = useSelector((state) => state);
  const [pendingTransactions, setPendingTransactions] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);
  const [transactionType, setTransactionType] = useState("pending");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(GetPendingTransactions())
      .unwrap()
      .then((res) => {
        if (res.status == "rejected") {
          if (res.message == "Auth failed") {
            newTokenFetch(dispatch, RefreshToken, () => {
              dispatch(GetPendingTransactions());
            });
          }
        } else {
          return res;
        }
      })
      .catch((e) => e);
  }, []);

  useEffect(() => {
    if (
      transactions.pendingTransactionsList &&
      transactions.pendingTransactionsList.length
    ) {
      setPendingTransactions(transactions.pendingTransactionsList);
    } else {
      setPendingTransactions([]);
    }
  }, [transactions.pendingTransactionsList]);

  useEffect(() => {
    if (transactions.transactionsList && transactions.transactionsList.length) {
      setAllTransactions(transactions.transactionsList);
    } else {
      setAllTransactions([]);
    }
  }, [transactions.transactionsList]);

  const handleClick = (e) => {
    setTransactionType(e.target.name);
  };

  function fethingAllTransactions() {
    if (!transactions.transactionsList.length) {
      dispatch(AdminGetAllTransactions())
        .unwrap()
        .then((res) => {
          if (res.status == "rejected") {
            if (res.message == "Auth failed") {
              newTokenFetch(dispatch, RefreshToken, () => {
                dispatch(AdminGetAllTransactions());
              });
            }
          } else {
            return res;
          }
        })
        .catch((e) => e);
    }
  }

  let obj = {
    _id: "62b3fc410642ab9d30310e4f",
    userId: "62b32096818e7cf754d0d01b",
    address: "0xC75aE46697021fd2eB58F55e44357CB3d485A788",
    amount: "-50",
    type: "withdraw",
    timeStamp: "6/23/2022, 5:38:09 AM",
    status: "pending",
    __v: 0,
  };

  const approveTransaction = (item) => {
    // params mien id, body mien refreshToken, headers mien authorization
    let refreshToken = localStorage.getItem("refreshToken");
    let user = localStorage.getItem("user");
    refreshToken = JSON.parse(refreshToken);
    user = JSON.parse(user);
    let body = {
      refreshToken: refreshToken,
      password: "admin",
      id: item._id,
    };

    dispatch(ApproveTransaction(body))
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res && res.status == "rejected") {
          if (res.message == "Auth failed") {
            newTokenFetch(dispatch, RefreshToken, () => {
              dispatch(ApproveTransaction(body));
              dispatch(AdminGetAllTransactions());
              dispatch(GetPendingTransactions());
              showAlertAndLoader(
                muiAlert,
                setMuiAlert,
                setOpen,
                "success",
                `Transaction Approved`
              );
            });
          } else {
            showAlertAndLoader(
              muiAlert,
              setMuiAlert,
              setOpen,
              "error",
              `Error Rejecting Transaction - ${res.message}`
            );
          }
        } else if (res && res.status == "fulfilled") {
          dispatch(AdminGetAllTransactions());
          dispatch(GetPendingTransactions());
          showAlertAndLoader(
            muiAlert,
            setMuiAlert,
            setOpen,
            "success",
            `Transaction Approved`
          );
          return res;
        } else {
          showAlertAndLoader(
            muiAlert,
            setMuiAlert,
            setOpen,
            "error",
            `Error Approving Transaction - ${res.message}`
          );
          return res;
        }
      })
      .catch((e) => {
        console.log(e);
        showAlertAndLoader(
          muiAlert,
          setMuiAlert,
          setOpen,
          "error",
          `Error Approving Transaction - ${e}`
        );
      });
  };

  const cancelTransaction = (item) => {
    // params mien id, body mien refreshToken, headers mien authorization
    let refreshToken = localStorage.getItem("refreshToken");
    let user = localStorage.getItem("user");
    refreshToken = JSON.parse(refreshToken);
    user = JSON.parse(user);
    let body = {
      refreshToken: refreshToken,
      password: "admin",
      id: item._id,
    };
    dispatch(RejectTransaction(body))
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res && res.status == "rejected") {
          if (res.message == "Auth failed") {
            newTokenFetch(dispatch, RefreshToken, () => {
              dispatch(RejectTransaction(body));
              dispatch(AdminGetAllTransactions());
              dispatch(GetPendingTransactions());
              showAlertAndLoader(
                muiAlert,
                setMuiAlert,
                setOpen,
                "success",
                `Rejected Transaction - ${res}`
              );
            });
          } else {
            showAlertAndLoader(
              muiAlert,
              setMuiAlert,
              setOpen,
              "error",
              `Error Rejecting Transaction - ${res.message}`
            );
          }
        } else if (res && res.status == "fulfilled") {
          dispatch(AdminGetAllTransactions());
          dispatch(GetPendingTransactions());
          showAlertAndLoader(
            muiAlert,
            setMuiAlert,
            setOpen,
            "success",
            `Transaction Rejected - ${res.message}`
          );
          return res;
        } else {
          showAlertAndLoader(
            muiAlert,
            setMuiAlert,
            setOpen,
            "error",
            `Error Rejecting Transaction - ${res}`
          );
          return res;
        }
      })
      .catch((e) => {
        console.log(e);
        showAlertAndLoader(
          muiAlert,
          setMuiAlert,
          setOpen,
          "error",
          `Error Rejecting Transaction - ${e}`
        );
      });
  };

  const logout = () => {
    try {
      let refreshToken = localStorage.getItem("refreshToken");
      refreshToken = JSON.parse(refreshToken);
      setOpen(true);
      dispatch(UserLogout({ refreshToken }))
        .unwrap()
        .then(() => {
          dispatch(clearTransactionsList());
          setMuiAlert({
            open: true,
            alertStatus: "success",
            alertMessage: "User Logout Success",
          });
          dispatch(removeuserDataFromLocalStorage());
          setMuiAlert({ ...muiAlert, open: false });
          navigate("/");
        })
        .catch();
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={
          open || auth.status === "Pending" || transactions.status === "Pending"
        }
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <AppHeader isAdmin={true} isAdminLogoutFunc={logout} />
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
              onClick={(e) => {
                handleClick(e);
                fethingAllTransactions();
              }}
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
          {transactionType == "pending"
            ? pendingTransactions.length
              ? pendingTransactions.map((obj, index) => {
                  return (
                    <IndividualTransaction
                      key={index}
                      dateTime={obj.timeStamp}
                      transactionAmount={`${obj.amount}$`}
                      transactionStatus={obj.status}
                      type={obj.type}
                      isPendingCard={true}
                      rejectTransactionFunc={() => {
                        cancelTransaction(obj);
                      }}
                      approveTransactionFunc={() => {
                        approveTransaction(obj);
                      }}
                    />
                  );
                })
              : "no pending transaction"
            : transactionType == "all" && allTransactions.length
            ? allTransactions.map((obj, index) => {
                return (
                  <IndividualTransaction
                    key={index}
                    dateTime={obj.timeStamp}
                    transactionAmount={`${obj.amount}$`}
                    transactionStatus={obj.status}
                    type={obj.type}
                  />
                );
              })
            : "no transaction found"}
        </div>
      </div>
    </>
  );
};

export default PendingTransactions;
